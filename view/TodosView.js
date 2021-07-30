'use strict';

const DELETE_BTN_SELECTOR = '.delete-btn';
const ADDER_BTN_SELECTOR = '.adder__btn';
const LIST_ITEM_SELECTOR = '.list__item';
const DONE_CLASS = 'done';


const $todoTemplate = $('#todoTemplate').html();
const $todoForm = $('#todoForm');
const $todoInput = $('#todoInput');


class TodosView {
    constructor($el, config = {}) {
        this._container = $el;
        this._$list = null;
        this._config = config;

        this.initView();
    }

    initView() {
        this._$list = $('<ul class="todolist__list list"></ul>');
        this._$list.on('click', DELETE_BTN_SELECTOR, this.onListClick.bind(this));
        $todoForm.submit(ADDER_BTN_SELECTOR, this.onFormSubmit.bind(this));
        this._$list.on('click', LIST_ITEM_SELECTOR, this.onListItemClick.bind(this));

        this._container.prepend(this._$list);
    }

    onListClick(e) {
        const id = this.getIdItem($(e.target));

        this._config.onDelete(id);
    }

    onFormSubmit(e) {
        e.preventDefault();

        if(this.isInputValid()){
            const formData = this.getFormData();

            this._config.onSubmit(formData);
            this.resetForm();
        }

    }

    onListItemClick(e) {
        const id = this.getIdItem($(e.target));

        this._config.onEdit(id);
    }

    renderList(list) {
        this._$list.html(list.map(this.getListItemHtml).join(''));
    }

    getListItemHtml({
        id,
        title,
        isDone
    }) {
        return $todoTemplate
            .replace('{{id}}', id)
            .replace('{{title}}', title)
            .replace('{{classDone}}', isDone ? DONE_CLASS : '');
    }

    getIdItem($el) {
        return $el.closest(LIST_ITEM_SELECTOR).data('todoId');
    }

    getFormData() {
        return {
            title: $todoInput.val(),
            isDone: false,
        };
    }

    isInputValid(){
        return $todoInput.val() !== '';
    }

    resetForm() {
        $todoInput.val('');
    }
}
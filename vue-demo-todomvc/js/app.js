(function (window) {
	"use strict";
	const URL = "http://localhost:3000/todos";
	const vm = new Vue({
		el: ".todoapp",
		data: {
			list: [],
			todoName: "",
			clickId: -1,
			visibility: "all",
		},
		filters: {
			pluralize: function (n) {
				return n === 1 ? "item" : "items";
			},
		},
		methods: {
			getTodoList() {
				axios({
					method: "get",
					url: "http://localhost:3000/todos?_sort=id&_order=desc",
				}).then((res) => {
					this.list = res.data;
				});
			},
			// 增加
			addTodo() {
				axios({
					method: "post",
					url: URL,
					data: {
						name: this.todoName,
						completed: false,
					},
				}).then((res) => {
					console.log("添加成功了，哈哈");
					this.todoName = "";
					this.getTodoList();
				});
			},
			// 删除
			delTodo(id) {
				axios({
					method: "delete",
					url: "http://localhost:3000/todos/" + id,
				}).then((res) => {
					this.getTodoList();
				});
			},
			// 修改
			changeState(id, completed) {
				axios({
					method: "patch",
					url: `http://localhost:3000/todos/${id}`,
					data: {
						completed,
					},
				}).then((res) => {
					this.getTodoList();
				});
			},
			// 显示对话框
			showEdit(id) {
				this.clickId = id;
			},
			// 修改名称
			updateTodo(id, name) {
				console.log(id, name);
				this.getTodoList();
			},
			// 清除
			clearTodo() {
				this.list
					.filter((item) => item.completed)
					.forEach((item) => {
						this.delTodo(item.id);
					});
			},
		},
		created() {
			this.getTodoList();
		},
		computed: {
			isShowFooter() {
				return this.list.length > 0;
			},
			leftCount() {
				return this.list.filter((item) => !item.completed).length;
			},
			isShowClear() {
				return this.list.some((item) => item.completed);
			},
		},
	});
})(window);

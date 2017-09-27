;
(function() {
	init();
	var task_list = JSON.parse(localStorage.getItem("task_list")) || [];
	$("#add-task-confirm").click(function(e) {
		var new_task = {};
		e.preventDefault();
		new_task.content = $("#add-task-detail").val();
		console.log(new_task.content)
		if(!new_task.content) {
			return;
		} else {
			add_task(new_task);
			location.reload();
			$("#add-task-detail").val("")
		}
	});

	function add_task(new_task) {
		task_list.push(new_task);
		localStorage.clear();
		localStorage.setItem('task_list', JSON.stringify(task_list));
		init();
	};

	function init() {
		var list = JSON.parse(localStorage.getItem("task_list")) || [];
		if(list.length > 0) {
			render(list);
		}
	};

	function render(data) {
		$(".task-list").empty();
		for(var i = 0; i < data.length; i++) {
			var node = '<div class="task-item">' +
				'<input type="checkbox" name="completed" id="completed" value="" />' +
				'<span class="title">' + data[i].content + '</span>' +
				'<span style = "float:right"><span class="action delete"> 删除</span>' +
				'<span class="action detail"> 详情</span></span>' +
				'</div>'
			$(".task-list").append(node);
		}
	}
	$(".delete").click(function() {
		var index = $(".task-list .delete").index(this);
		if(confirm("你确定要删除吗？")) {
			del_list(index);
		}
	})

	function del_list(index) {
		task_list.splice(index, 1);
		localStorage.clear();
		localStorage.setItem('task_list', JSON.stringify(task_list));
		init();
		location.reload();
	}

	var $mask = $(".task-detail-mask");
	var $detail = $(".task-detail");
	$(".detail").click(function() {
		$mask.attr("style", "display: block;");
		$detail.attr("style", "display: block;");
		/*var index = $(".task-list .detail").index(this);
		showTaskDetails(index);*/
		var parent = $(this).parents().find(".task-item")
	})
	
	$mask.click(function(){
		$mask.attr("style", "display: none;");
		$detail.attr("style", "display: none;");
	})
	
	/*function showTaskDetail(index){
		var node = JSON.parse(localStorage.getItem("task_list"))[index];
		
	}*/
})()
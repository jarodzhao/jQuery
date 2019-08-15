$(function(){
	formValidator();
	
	$("#form1").find('#submit').on('click', function(){
		$("#form1").data('bootstrapValidator').validate();
	});
	$("#form1").find("#reset").on('click', function(){
		$("#form1").data('bootstrapValidator').resetForm(true);
	})
});

function formValidator(){
	$("#form1").bootstrapValidator({
		message: '输入不合法',
		feedbackIcons: {
　　　　　　　　valid: 'glyphicon glyphicon-ok',
　　　　　　　　invalid: 'glyphicon glyphicon-remove',
　　　　　　　　validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			username: {
				message: '用户名验证失败',
				validators: {
					notEmpty: {
						message: '用户不能为空'
					},
					stringLength: {
						min: 3,
						max: 18,
						message: '用户名长度必须在3到18位之间'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_]+$/,
						message: '用户名只能包含大写、小写、数字和下划线'
					}
				}
			},
			email: {
				validators: {
					notEmpty: {
						message: '邮箱不能为空'
					},
                    emailAddress: {
                        message: '邮箱地址格式有误'
                    }
				}
			}
		}
	});
}
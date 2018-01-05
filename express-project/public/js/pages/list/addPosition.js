function AddPosition(container) {
  this.container = container;
  this.init();
}

AddPosition.BtnTemp = `
  <button type="button" class="btn btn-info"  data-toggle='modal' data-target='.js-addpos-modal'>增加</button>
`;

AddPosition.ModelTemp = `
	<div class="modal fade js-addpos-modal" role="dialog" aria-labelledby="AddPositionLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="RegisterLabel">新增职位</h4>
	      </div>
	      <div class="modal-body">
          <div class="form-group">
            <label for="addpos-company">公司名称</label>
            <input type="text" class="form-control js-company" id="addpos-company" placeholder="请输入公司名称">
          </div>
          <div class="form-group">
            <label for="addpos-">职位名称</label>
            <input type="text" class="form-control js-position" id="addpos-position" placeholder="请输入职位名称">
          </div>
          <div class="form-group">
            <label for="addpos-salary">薪资范围</label>
            <input type="text" class="form-control js-salary" id="addpos-salary" placeholder="请输入薪资范围">
          </div>
          <div class="form-group">
            <label for="addpos-address">办公地点</label>
            <input type="text" class="form-control js-address" id="addpos-address" placeholder="请输入办公地点">
          </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary js-submit">提交</button>
	      </div>
	      <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
			添加成功
	      </div>
	      <div class="alert alert-danger hide js-err-notice" role="alert" style="margin:20px;">
			对不起，您所注册的用户名已存在
	      </div>
	    </div>
	  </div>
	</div>
`;

$.extend(AddPosition.prototype, {

  init: function () {
    this.createDom();
    this.bindEvents();
  },
  createDom: function () {
    this.btn = $(AddPosition.BtnTemp);
    this.modal = $(AddPosition.ModelTemp);
    this.succNoticeElem = this.modal.find('.js-succ-notice');
    this.container.append(this.btn);
    this.container.append(this.modal);
  },
  bindEvents: function() {
    var submitBtn = this.modal.find(".js-submit");
    submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
  },
  handleSubmitBtnClick: function () {
    var company = this.modal.find(".js-company").val(),
        position = this.modal.find(".js-position").val(),
        salary = this.modal.find(".js-salary").val(),
        address = this.modal.find(".js-address").val();
    
    $.ajax({
      type: "POST",
      url: "/api/addPosition",
      data: {
        company: company,
        position: position,
        salary: salary,
        address: address
      },
      success: $.proxy(this.handleAddPositionSucc, this)
    })
  },
  handleAddPositionSucc: function (res) {
    if (res && res.data && res.data.inserted){
      this.succNoticeElem.removeClass("hide");
      setTimeout($.proxy(this.handleDelay, this), 2000);
      $(this).trigger("change");
    }
    console.log(res);
  },
  handleDelay(){
    this.succNoticeElem.addClass("hide");
    this.modal.modal("hide");
  }
})
/*
    2.3.2
    高京
    2016-10-25

    this = {
        dom_bg_layer: 背景层,
        dom_info_box: 内容层,
        dom_info_p_box: 内容和段落中间层——JRoll用,
        dom_info_p: 段落层,
        dom_image_box: 图片层,
        dom_close_box: 关闭层,
        dom_close_image: 关闭图片,
        dom_image_ul: 图片ul盒,
        dom_image_li: 图片li盒,
        dom_arrow_left_box: 图片左箭头盒,
        dom_arrow_left_image: 图片左箭头,
        dom_arrow_right_box: 图片右箭头盒,
        dom_arrow_right_image: 图片右箭头
    }
*/
/*jshint esversion:6 */

function LayerShow() {
    return {
        // 图片尺寸占window的比例
        image_size_percent_from_window_width: 0.8,
        image_size_percent_from_window_height: 0.9,

        // 标记是否正在执行图片切换
        image_sliding: false,

        // 创建DOM
        create_dom: function() {

            var _this = this;
            var dom_body = $("body");

            // 背景层
            _this.dom_bg_layer = $(document.createElement("div"))
                .css({
                    "position": "fixed",
                    "top": 0,
                    "left": 0,
                    "opacity": 0,
                    "filter": "alpha(opacity=0)",
                    "-moz-opacity": 0
                })
                .appendTo(dom_body);

            // 内容层
            _this.dom_info_box = $(document.createElement("div"))
                .attr("id", "info_wrapper")
                .css({
                    "position": "fixed",
                    "display": "none",
                    "top": "0",
                    "left": "0",
                    "padding": "0",
                    "margin": "0"
                })
                .appendTo(dom_body);

            // 底部fixed层
            _this.dom_info_bottom_fixed_box = $(document.createElement("div")).appendTo(_this.dom_info_box);

            // 内容jroll层
            _this.dom_info_jroll_box = $(document.createElement("div"))
                .attr("class", "jroll")
                .prependTo(_this.dom_info_box);

            // 段落层
            _this.dom_info_p = $(document.createElement("p")).css("margin", "0").appendTo(_this.dom_info_jroll_box);

            // 图片层
            _this.dom_image_box = $(document.createElement("div"))
                .css({
                    "position": "fixed",
                    "display": "none",
                    "overflow": "hidden",
                    "top": "0",
                    "left": "0"
                })
                .appendTo(dom_body);

            // 关闭层
            _this.dom_close_box = $(document.createElement("div"))
                .css({
                    "position": "fixed",
                    "display": "none",
                    "top": "10px",
                    "right": "10px"
                })
                .appendTo(dom_body);

            // 关闭图片
            _this.dom_close_image = $(document.createElement("img"))
                .css({
                    "cursor": "pointer"
                })
                .appendTo(_this.dom_close_box)
                .on("touchstart mousedown", function(e) {
                    e.preventDefault();
                    _this.close.apply(_this);
                });

            // 图片ul盒
            _this.dom_image_ul = $(document.createElement("ul"))
                .css({
                    "position": "absolute",
                    "list-style": "none",
                    "padding": 0,
                    "margin": 0
                })
                .appendTo(_this.dom_image_box);

            // 图片li盒
            _this.dom_image_li = $(document.createElement("li"));

            // 图片左箭头盒
            _this.dom_arrow_left_box = $(document.createElement("div"))
                .css({
                    "position": "absolute",
                    "display": "none",
                    "text-align": "center"
                })
                .appendTo(_this.dom_image_box);

            // 图片左箭头
            _this.dom_arrow_left_image = $(document.createElement("img"))
                .css({
                    "display": "inline"
                })
                .appendTo(_this.dom_arrow_left_box);

            // 图片右箭头盒
            _this.dom_arrow_right_box = $(document.createElement("div"))
                .css({
                    "position": "absolute",
                    "display": "none"
                })
                .appendTo(_this.dom_image_box);

            // 图片右箭头
            _this.dom_arrow_right_image = $(document.createElement("img"))
                .css({
                    "display": "inline"
                })
                .appendTo(_this.dom_arrow_right_box);
        },

        // 设置宽高和位置
        resize: function() {
            var _this = this;

            // 获得窗口尺寸
            _this.window_width_px = $(window).width();
            _this.window_height_px = $(window).height();

            // 计算图片li盒的宽度（含margin-left）
            _this.li_width_px = _this.window_width_px * _this.image_size_percent_from_window_width;
            _this.li_marginLeft_px = _this.window_width_px * (1 - _this.image_size_percent_from_window_width) / 2;
            _this.li_item_width_px = _this.li_width_px + _this.li_marginLeft_px;

            // 背景层
            _this.dom_bg_layer.css({
                // "width": _this.window_width_px + "px",
                // "height": _this.window_height_px + "px",
                "width": "100%",
                "height": "100%",
                "background": _this.Paras.bg_color,
                "z-index": _this.Paras.z_index
            });

            // 关闭按钮层
            if (_this.Paras.Pics_close_show) {
                _this.imageLoad(_this.Paras.Pics_close_path, function($img) {

                    var box_size = {
                        width: _this.window_width_px * 0.1,
                        height: _this.window_width_px * 0.1
                    };
                    var img_size = _this.imageGetSize($img, box_size);

                    _this.dom_close_box.css({
                        "width": img_size.img_width + "px",
                        "height": img_size.img_height + "px",
                        "z-index": _this.Paras.z_index + 2
                    });

                    _this.dom_close_image.css({
                        "width": img_size.img_width + "px",
                        "height": img_size.img_height + "px"
                    }).attr("src", _this.Paras.Pics_close_path);

                    if (_this.Paras.showKind == 1)
                        _this.dom_close_box.appendTo(_this.dom_image_box);
                    else if (_this.Paras.showKind == 2)
                        _this.dom_close_box.appendTo(_this.dom_body);

                    // _this.dom_close_box.show(0);

                });
            }

            if (_this.Paras.showKind == 1) {

                // 图片层
                _this.dom_image_box.css({
                    "width": _this.window_width_px + "px",
                    "height": _this.window_height_px + "px",
                    "z-index": _this.Paras.z_index + 1
                });

                // 图片li盒
                var li_obj = _this.dom_image_ul.find("li");
                li_obj.css({
                    "width": _this.li_width_px + "px",
                    "height": _this.window_height_px * _this.image_size_percent_from_window_height + "px",
                    "margin-top": _this.window_height_px * (1 - _this.image_size_percent_from_window_height) / 2 + "px",
                    "margin-left": _this.li_marginLeft_px + "px"
                });

                // 图片ul盒
                _this.dom_image_ul.css({
                    "width": _this.li_item_width_px * li_obj.length + "px",
                    "height": _this.window_height_px + "px",
                    "top": 0,
                    "left": 0
                });

                // 左箭头 及 点击监听
                _this.imageLoad(_this.Paras.Pics_arrow_left, function($img) {

                    // 获得宽高
                    var arrow_width_px = _this.li_marginLeft_px * 0.8;
                    if (arrow_width_px > $img.width)
                        arrow_width_px = $img.width;
                    var arrow_height_px = arrow_width_px / $img.width * $img.height;

                    // 盒位置和宽高
                    _this.dom_arrow_left_box
                        .css({
                            "width": arrow_width_px + "px",
                            "height": arrow_height_px + "px",
                            "left": _this.li_marginLeft_px * 0.1,
                            "top": "50%",
                            "margin-top": "-" + (arrow_height_px / 2) + "px"
                        })
                        .unbind().on("touchstart mousedown", function(e) {
                            e.preventDefault();
                            _this.imageUlSlideLeft.apply(_this, [1]);
                        });

                    // 装载图片
                    _this.dom_arrow_left_image.attr("src", _this.Paras.Pics_arrow_left)
                        .css({
                            "cursor": "pointer",
                            "width": arrow_width_px + "px",
                            "height": arrow_height_px + "px"
                        });
                });

                // 右箭头 及 点击监听
                _this.imageLoad(_this.Paras.Pics_arrow_right, function($img) {

                    // 获得宽高
                    var arrow_width_px = _this.li_marginLeft_px * 0.8;
                    if (arrow_width_px > $img.width)
                        arrow_width_px = $img.width;
                    var arrow_height_px = arrow_width_px / $img.width * $img.height;

                    // 盒位置和宽高
                    _this.dom_arrow_right_box
                        .css({
                            "width": arrow_width_px + "px",
                            "height": arrow_height_px + "px",
                            "right": _this.li_marginLeft_px * 0.1,
                            "top": "50%",
                            "margin-top": "-" + (arrow_height_px / 2) + "px"
                        })
                        .unbind().on("touchstart mousedown", function(e) {
                            e.preventDefault();
                            _this.imageUlSlideRight.apply(_this, [1]);
                        });

                    // 装载图片
                    _this.dom_arrow_right_image.attr("src", _this.Paras.Pics_arrow_right)
                        .css({
                            "cursor": "pointer",
                            "width": arrow_width_px + "px",
                            "height": arrow_height_px + "px"
                        });
                });

            } else if (_this.Paras.showKind == 2) {

                // 获得弹层尺寸
                _this.info_box_width_px = _this.window_width_px * _this.Paras.info_box_width_per / 100;
                _this.info_box_height_px = _this.window_height_px * _this.Paras.info_box_height_per / 100;

                // 设置弹层样式
                _this.dom_info_box.css({
                    // "box-sizing": "border-box",
                    "width": _this.info_box_width_px + "px",
                    "height": _this.info_box_height_px + "px",
                    "top": "50%",
                    "left": "50%",
                    "margin-top": (-_this.info_box_height_px / 2) + "px",
                    "margin-left": (-_this.info_box_width_px / 2) + "px",
                    "background": _this.Paras.info_box_bg,
                    "overflow": "hidden",
                    "z-index": _this.Paras.z_index + 1
                });


                // 设置jroll层样式
                var jroll_height = _this.info_box_height_px;
                if (_this.Paras.info_bottom_fixed_content && _this.Paras.info_bottom_fixed_content !== "") {
                    jroll_height -= _this.Paras.info_bottom_fixed_height;

                    // 设置bottom_fixed样式
                    _this.dom_info_bottom_fixed_box.css({
                        "height": _this.Paras.info_bottom_fixed_height + "px"
                    });
                }
                _this.dom_info_jroll_box.css({
                    "height": jroll_height + "px",
                    "overflow": "hidden"
                });

                // 设置段落样式
                _this.dom_info_p.css({
                    "font-size": _this.Paras.info_box_fontSize,
                    "color": _this.Paras.info_box_fontColor,
                    "padding": _this.Paras.info_box_padding_px + "px",
                    "line-height": _this.Paras.info_box_lineHeight
                });

                // 设置弹层圆角
                if (_this.Paras.info_box_radius)
                    _this.dom_info_box.css("border-radius", "5px");
            }

            // 监听窗口resize
            var resize_n = 0;
            var resize_do = function() {
                if (++resize_n > 1)
                    return;
                if (_this.dom_bg_layer.width() !== 0) {
                    setTimeout(function() {
                        if (_this.isIE678() && _this.Paras.showKind == 1) {
                            _this.close.apply(_this, [true]);
                        } else {
                            _this.resize.apply(_this);
                        }
                        resize_n = 0;
                    }, 0);
                }
            };
            $(window).unbind("resize", resize_do).bind("resize", resize_do);

        },

        // 显示弹层
        /*
            opt = {
                z_index: 弹层的z-index。图片/图文内容层为z_index+1。默认400
                bg_color: 背景层16进制颜色。默认#000000
                bg_opacity: 背景层透明度，0～1。默认0.8
                showKind: 1-图片 | 2-HTML。默认1
                Pics: showKind=1时有效。图片路径列表，数组。如 ["/images/001.jpg","/images/002.png"]。无默认值
                Pics_scroll_speed: showKind=1时有效。图片切换时的速度。毫秒。默认500。移动端建议设置为100-200，过慢会有卡顿的现象
                Pics_arrow_left: showKind=1时有效。图片切换 左箭头图片路径。默认/inc/LayerShow_arrow_left.png。
                Pics_arrow_right: showKind=1时有效。图片切换 右箭头图片路径。默认/inc/LayerShow_arrow_left.png。
                callback_image_click: showKind=1时有效。图片点击回调：1-关闭弹层 | 2-下一张图片 | function(li_obj)-自定义方法。默认"1"
                info_content: showKind=2时有效，装载内容。无默认
                info_box_width_per: showKind=2时有效，内容盒宽度百分比。默认80
                info_box_height_per: showKind=2时有效，内容盒高度百分比。默认90
                info_box_radius: showKind=2时有效，内容盒是否圆角。默认true
                info_box_bg: showKind=2时有效，内容盒背景。默认"#ffffff"
                info_box_padding_px: showKind=2时有效，内容盒padding。默认20
                info_box_fontSize: showKind=2时有效，内容盒字体大小。默认"14px"
                info_box_fontColor: showKind=2时有效，内容盒字体颜色。默认"#333"
                info_box_lineHeight: showKind=2时有效，内容盒行间距。默认"30px"
                info_box_use_JRoll: showKind=2时有效，内容盒使用JRoll滚动（建议移动端使用，web端不用。IE7、8不兼容）如使用，则需要依赖或引用jroll.js。默认true
                JRoll_obj: JRoll对象。不使用JRoll做内容盒滚动，可不传。
                info_bottom_fixed_content: showKind=2时有效，底部固定层内容。无默认。
                info_bottom_fixed_height: showKind=2 && info_bottom_fixed_content!="" 时有效，高度，单位px。默认40
                Pics_close_show: true/false。显示关闭按钮。默认true
                Pics_close_path: 关闭按钮图片路径。默认/inc/LayerShow_close.png。
                callback_before: 弹层前回调。如显示loading层。无默认
                callback_success: 弹层成功回调。如关闭loading层。无默认
                callback_close: 关闭弹层后的回调。没想好如什么。无默认
            }
        */
        show: function(opt) {
            var _this = this;

            var opt_default = {
                z_index: 400,
                bg_color: "#000",
                bg_opacity: 0.8,
                showKind: 1,
                Pics: [],
                Pics_show_index: 3,
                Pics_scroll_speed: 500,
                Pics_arrow_left: "../../assets/LayerShow_arrow_left.png",
                Pics_arrow_right: "../../assets/LayerShow_arrow_right.png",
                callback_image_click: 1,
                info_box_width_per: 80,
                info_box_height_per: 90,
                info_box_radius: true,
                info_box_bg: "#fff",
                info_box_padding_px: 20,
                info_box_fontSize: "14px",
                info_box_fontColor: "#333",
                info_box_lineHeight: "30px",
                info_box_use_JRoll: true,
                info_bottom_fixed_height: 40,
                Pics_close_show: true,
                Pics_close_path: "../../assets/LayerShow_close.png"
            };

            _this.Paras = $.extend(opt_default, opt);

            // IE78强制不使用JRoll
            if (_this.isIE678())
                _this.Paras.info_box_use_JRoll = false;

            // 看有没有创建dom
            if (!_this.dom_bg_layer)
                _this.create_dom.apply(_this);

            // 执行弹层前回调
            if (_this.Paras.callback_before)
                _this.Paras.callback_before();

            // 装载图片或内容
            if (_this.Paras.showKind == 1) {
                if (_this.Paras.Pics.length > 0) {

                    // 重新组织Pics
                    if (_this.Paras.Pics_show_index > 0 && _this.Paras.Pics_show_index < _this.Paras.Pics.length) {
                        (function() {
                            var Pics_temp = _this.Paras.Pics;
                            _this.Paras.Pics = [];
                            var i = _this.Paras.Pics_show_index,
                                len = Pics_temp.length;
                            for (; i < len; i++) {
                                _this.Paras.Pics.push(Pics_temp[i]);
                            }
                            for (i = 0; i < _this.Paras.Pics_show_index; i++) {
                                _this.Paras.Pics.push(Pics_temp[i]);
                            }
                        })();
                    }

                    // 插入li到ul。监听li点击
                    var insert_li = function() {
                        _this.dom_image_li.clone()
                            .appendTo(_this.dom_image_ul)
                            .on("touchstart mousedown", function(e) {
                                e.preventDefault();

                                if (typeof _this.Paras.callback_image_click === "function") // 自定义方法
                                    _this.Paras.callback_image_click($(this));
                                else if (_this.Paras.callback_image_click == 1) // 关闭弹层
                                    _this.close.apply(_this);
                                else if (_this.Paras.callback_image_click == 2) // 下一张图片
                                    _this.imageUlSlideLeft.apply(_this, [1]);
                            });
                    };

                    // 图片加载成功后的回调（获得图片组中显示大小）
                    var imageLoaded_success = function() {
                        var imageLoaded_success_count = 0;
                        return function($img, now_index) {

                            // 计算图片应显示尺寸
                            var img_size = _this.imageGetSize.apply(_this, [$img]);

                            // 获得背景图片尺寸的样式。如进行了缩小，则设为"contain"
                            var background_size = img_size.img_width + "px," + img_size.img_height + "px";
                            if ((img_size.img_width >= img_size.box_width || img_size.img_height >= img_size.box_height) && !_this.isIE678())
                                background_size = "contain";

                            // 装载图片到li
                            var li = _this.dom_image_ul.find("li");
                            var style = "";
                            style += "float:left;";
                            style += "cursor:pointer;";
                            if (_this.isIE678()) {
                                style += "position:relative;";

                                $(document.createElement("img"))
                                    .attr("src", $img.src)
                                    .css({
                                        "width": img_size.img_width,
                                        "height": img_size.img_height,
                                        "position": "absolute",
                                        "top": "50%",
                                        "left": "50%",
                                        "margin-top": "-" + (img_size.img_height / 2) + "px",
                                        "margin-left": "-" + (img_size.img_width / 2) + "px"
                                    }).appendTo($(li[now_index]));

                            } else {
                                style += "background: url(" + $img.src + ") no-repeat;"; //
                                // style += "background-attachment: fixed;";
                                style += "background-position: center;";
                                style += "background-size: " + background_size + ";";
                            }
                            if (now_index > 0) {
                                style += "width: " + $(li[0]).css("width") + ";";
                                style += "height: " + $(li[0]).css("height") + ";";
                                style += "margin-top: " + $(li[0]).css("margin-top") + ";";
                                style += "margin-left: " + $(li[0]).css("margin-left") + ";";
                            }
                            $(li[now_index]).attr("style", style);

                            if (now_index === 0) {

                                // 设置弹层宽高和位置
                                _this.resize.apply(_this);

                                // 显示关闭按钮
                                _this.dom_close_box.fadeIn(200);

                                // 加载其他图片
                                var i = 1,
                                    len = _this.Paras.Pics.length,

                                    // 加载成功后的回调，因为是循环调用，所以闭包伺候
                                    _imageLoaded_success = function(now_index) {
                                        return function($img) {
                                            imageLoaded_success($img, now_index);
                                        };
                                    };

                                for (; i < len; i++) {
                                    insert_li();
                                    _this.imageLoad.apply(_this, [_this.Paras.Pics[i], _imageLoaded_success(i)]);
                                }

                                // 显示弹层
                                _this.dom_bg_layer.fadeTo(200, _this.Paras.bg_opacity);
                                _this.dom_image_box.fadeIn(200, function() {
                                    if (_this.Paras.callback_success)
                                        _this.Paras.callback_success(li);
                                });

                            } else {

                                if (++imageLoaded_success_count + 1 == _this.Paras.Pics.length) {

                                    // console.log("514");
                                    // console.log(++imageLoaded_success_count);
                                    // console.log($(li[now_index]).width());

                                    // 重置ul宽度
                                    _this.dom_image_ul.css("width", _this.li_item_width_px * li.length + "px");

                                    // 显示左右箭头
                                    if (_this.dom_arrow_left_box.css("display") == "none") {
                                        _this.dom_arrow_left_box.fadeIn(200);
                                        _this.dom_arrow_right_box.fadeIn(200);
                                    }
                                }
                            }
                        };
                    }();

                    // 加载第一张图片。回调中显示弹层，开始加载其他图片
                    insert_li();
                    _this.imageLoad.apply(_this, [_this.Paras.Pics[0], function($img) {
                        imageLoaded_success($img, 0);
                    }]);
                }

            } else if (_this.Paras.showKind == 2) {

                // 获得窗口尺寸
                // _this.window_width_px = $(window).width();
                // _this.window_height_px = $(window).height();

                // 设置盒内容
                if (_this.Paras.info_content)
                    _this.dom_info_p.html(_this.Paras.info_content);

                // 设置底部fixed盒内容
                if (_this.Paras.info_bottom_fixed_content)
                    _this.dom_info_bottom_fixed_box.html(_this.Paras.info_bottom_fixed_content);

                // 设置弹层宽高和位置
                _this.resize.apply(_this);

                // 显示弹层
                _this.dom_bg_layer.fadeTo(200, _this.Paras.bg_opacity);
                _this.dom_info_box.fadeIn(200, function() {
                    // 设置JRoll滚动
                    if (_this.Paras.info_box_use_JRoll && _this.Paras.JRoll_obj) {
                        _this.jroll_obj = new _this.Paras.JRoll_obj(_this.dom_info_jroll_box[0]);
                    }

                    // console.log(_this.Paras.info_box_use_JRoll, _this.jroll_obj);
                    // 成功回调
                    if (_this.Paras.callback_success)
                        _this.Paras.callback_success(_this.jroll_obj);
                });
                _this.dom_close_box.fadeIn(200);

            }
        },
        // 关闭弹层
        // reShow==true时重新显示弹层。用于IE678的resize
        close: function(reShow) {
            var _this = this;

            _this.dom_bg_layer.fadeTo(200, 0, function() {
                $(this).css({
                    "width": 0,
                    "height": 0
                });
            });

            if (_this.Paras.showKind == 1) {
                _this.dom_image_box.fadeOut(200, function() {

                    // 清空li
                    _this.dom_image_ul.html("");

                    if (reShow) {
                        _this.show.apply(_this, [_this.Paras]);
                    } else if (_this.Paras.callback_close)
                        _this.Paras.callback_close();
                });
            } else if (_this.Paras.showKind == 2) {

                var info_wrapper_html = _this.dom_info_box.html();

                if (_this.Paras.info_box_use_JRoll) {
                    // 销毁jroll对象
                    // _this.jroll_obj.destroy();

                    // 清空段落的style
                    _this.dom_info_p.removeAttr("style");
                }

                // 内容盒回到顶端
                _this.dom_info_box.scrollTop(0);

                // 清空内容盒
                _this.dom_info_p.html("");

                // 隐藏弹层
                _this.dom_close_box.fadeOut(200);
                _this.dom_info_box.fadeOut(200, function() {
                    if (reShow) {
                        _this.show.apply(_this, [_this.Paras]);
                    } else if (_this.Paras.callback_close)
                        _this.Paras.callback_close(info_wrapper_html);
                });
            }
        },
        // 图片加载
        // function(img)
        imageLoad: function(picPath, callback) {
            var img = new Image();
            img.src = picPath;
            var _callback = function() {
                if (callback)
                    callback(img);
            };
            if (img.width)
                _callback();
            else {
                img.onload = function() {
                    _callback();
                };
            }

        },
        // 根据图片和显示盒的宽高，计算图片最终显示大小
        // box_size{width:0,height:0}为显示盒的宽高，如图片大于此宽高尺寸，则缩放。
        // box_size 默认为{width: _this.window_width_px * _this.image_size_percent_from_window_width, height: _this.window_height_px * _this.image_size_percent_from_window_height}
        imageGetSize: function(img, box_size) {
            var _this = this;

            _this.window_width_px = $(window).width();
            _this.window_height_px = $(window).height();

            // 获得图片盒尺寸
            if (!box_size)
                box_size = {
                    width: _this.window_width_px * _this.image_size_percent_from_window_width,
                    height: _this.window_height_px * _this.image_size_percent_from_window_height
                };

            // 获得图片的宽、高、宽高比
            var img_width_px = img.width;
            var img_height_px = img.height;
            var img_ratio = img_width_px / img_height_px;

            // 获得容器的宽高比
            var box_ratio = box_size.width / box_size.height;

            // 根据宽高比，决定最后图片的宽、高
            if (img_ratio <= box_ratio && img_height_px > box_size.height) {
                img_height_px = box_size.height;
                img_width_px = img_height_px * img_ratio;
            } else if (img_ratio >= box_ratio && img_width_px > box_size.width) {
                img_width_px = box_size.width;
                img_height_px = img_width_px / img_ratio;
            }

            return {
                img_width: img_width_px,
                img_height: img_height_px,
                box_width: box_size.width,
                box_height: box_size.height
            };
        },
        // 图片向左移动X屏
        imageUlSlideLeft: function(x) {
            var _this = this;

            if (_this.image_sliding)
                return;

            _this.image_sliding = true;

            // 如果x大于图片总数-1，则退出
            var li_obj = _this.dom_image_ul.find("li");
            if (x > li_obj.length - 1)
                return;

            _this.dom_image_ul.animate({
                "left": -x * _this.li_item_width_px + "px"
            }, _this.Paras.Pics_scroll_speed, function() {

                // 将队列头部的x个li移到队尾
                var i = 0;
                for (; i < x; i++) {
                    $(li_obj[i]).appendTo(_this.dom_image_ul);
                }

                // 还原ul位置
                _this.dom_image_ul.css("left", 0);

                _this.image_sliding = false;
            });

        },
        // 图片向右移动X屏
        imageUlSlideRight: function(x) {
            var _this = this;

            if (_this.image_sliding)
                return;

            _this.image_sliding = true;

            // 如果x大于图片总数-1，则退出
            var li_obj = _this.dom_image_ul.find("li");
            if (x > li_obj.length - 1)
                return;

            // 将队列尾的x个li移到最前
            var i = 0,
                len = li_obj.length;
            for (; i < x; i++) {
                $(li_obj[len - i - 1]).prependTo(_this.dom_image_ul);
            }
            _this.dom_image_ul.css("left", -x * _this.li_item_width_px + "px");

            // 滚动
            _this.dom_image_ul.animate({
                "left": "0"
            }, _this.Paras.Pics_scroll_speed, function() {
                _this.image_sliding = false;
            });

        },
        // 判断是否为IE6/7/8浏览器
        isIE678: function() {
            var yes = false;
            var browser = navigator.appName;
            if (browser == "Microsoft Internet Explorer") {
                var b_version = navigator.appVersion;
                var version = b_version.split(";");
                var trim_Version = version[1].replace(/[ ]/g, "");
                if (trim_Version == "MSIE6.0" || trim_Version == "MSIE7.0" || trim_Version == "MSIE8.0") {
                    yes = true;
                }
            }
            return yes;
        }
    };
}

// if (typeof define === "function" && define.amd) {
//     define(function() {
//         return LayerShow;
//     });
// }

export default LayerShow;

/**
 * shituocheng
 * 登录页面
 */
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import pic_code from '@framework/lib/pic_code.js';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from '@framework/Component/Loading/loading.component';
import { environment } from '../../environments/environment';
import PromptLayer from '@framework/lib/PromptLayer';
import { EventQueue } from '@framework/Utils/EventQueue';
declare var jquery: any;
declare var $: any;

class UserInfo {
  userName?: string;
  userPassword?: string;
}

@Component({

  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.less']
})

export class Login implements OnInit, AfterViewInit {

  public loginForm: FormGroup;
  user = new UserInfo();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private loadingService: LoadingService,
    private router: Router,
    private eventQueue: EventQueue
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    });
  }

  ngAfterViewInit() {
  }

  loginSubmit() {

    // 生成二维码图片
    this.loginForm.controls['name'].markAsTouched();
    this.loginForm.controls['password'].markAsTouched();
    if (this.loginForm.valid) {
      // this.pic_codeHandler();

      this.submitHandler(environment.loginAPI);
    }
  }

  isFieldValid(field: string) {
    return !this.loginForm.get(field).valid && this.loginForm.get(field).touched;
  }

  private submitHandler(url?: string) {

    $.ajax({
      type: 'Post',
      url: url,
      data: {
        Aname: this.user.userName,
        Passwd: this.user.userPassword
      },
      beforeSend: () => {
        this.loadingService.show.emit(null);
      },
      success: (d) => {
        this.loadingService.hide.emit(null);
        // 登陆失败
        if (d === '-1') {
          layer.msg('用户名密码错误请您仔细核实', () => this.user.userPassword = '');
          return;
        }

        localStorage.setItem('userToken', d);
        environment.user.Aname = this.user.userName;
        environment.isLogin = true;

          this.router.navigateByUrl('/index');
      },
      error: function () {
        PromptLayer.show({
          str: '登录失败请稍后重试'
        });
      }
    });
  }

  private pic_codeHandler() {
    pic_code.init({
      show_pic_code: '.loginBtn', // 点击显示验证码的按钮class或id
      pic_position: '.pic_code', // 图片验证码外包层class
      pic_original_width: 1280, // 图片原始大小(以px为单位)，默认900
      pic_small_width: 150, // 隐形小图的宽（正方形的小图，以px为单位），默认100
      div_width: 500, // 设置大图的默认宽
      div_height: 313, // 设置大图的默认高
      valid_range: 10, // 图片验证正确的容错范围，默认是5
      unit: 'px', // 宽高及容错范围单位 'px|vw', 默认px，且IE6/7/8强制使用px
      pic_mask: true, // 验证码大遮罩层，false-不显示遮罩层，true-显示遮罩层
      Pic_mask_color: '#000', // 验证码大遮罩层颜色
      Pic_mask_opacity: 0.6, // 验证码大遮罩层透明度
      Pic_click_key: 'ture', // 开关，点击遮罩层验证码是否隐藏，true-隐藏，false-不隐藏
      Url_getPic: '../../loginHandler/Pic_code.ashx', // 获取图片地址的接口
      url_submit: '../../loginHandler/Pic_code_valid.ashx', // 验证码，验证完成提交的地址
      Callback_error_repeatedly_count: 3, // 触发多次验证失败回调的失败次数
      z_index: 800, // 设置标签z_index
      Callback_error: function() { // 验证失败回调，默认为滑块和拼图小块滑回原位pic_code.doMove(oDiv2);
        pic_code.doMove();
      },
      Callback_error_repeatedly: function() { // 多次验证失败回调，优先于Callback_error  默认事件pic_code.change_background_url();
        pic_code.change_background_url();
      },
      Callback_success: function() { // 验证成功回调，默认方法：pic_code.valid_success_callback()  如果没有自定义方法此参数不传
        pic_code.valid_success_callback();

        setTimeout(function() {
          pic_code.pic_code_hide();

          // 登陆
          // this.submitHandler(environment.loginAPI);
        }, 500);
      }
    });

    pic_code.open();
  }

  private formCheck() {

    // if(this.user.userName.re)
  }
}

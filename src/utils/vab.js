/*
 * 全局函数封装，挂载在Vue原型下
 * @Author: mikey.yc
 * @Date: 2021-09-14 09:43:33
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-09-14 10:17:32
 */

/** 封装公用Iview提示 */
import { Spin, Message, Modal, Notice } from 'view-design'

const install = (Vue, opts = {}) => {
  /* 全局Loading状态开始*/
  Vue.prototype.$loadingShow = (desc) => {
    Spin.show({
      render: h => {
        return h('div', [
          h('Spin', {
            class: 'dots-loader'
            // class: 'vab-loading-type'
          }),
          h('div', desc || '正在加载中...')
        ])
      }
    })
  }
  /* 全局Loading状态结束 */
  Vue.prototype.$loadingHide = () => {
    Spin.hide()
  }

  /* 全局Message */
  Vue.prototype.$baseMessage = (content, type, duration) => {
    Message[type]({
      closable: true, // 是否显示关闭按钮
      content: content,
      dangerouslyUseHTMLString: true,
      duration: duration || 5// 自动关闭的延时 单位秒
    })
  }

  /* 全局Alert */
  Vue.prototype.$baseAlert = (title, content, type, callback) => {
    Modal[type || 'success']({
      title: title || '温馨提示',
      content: content,
      onOk: () => {
        if (callback) {
          callback()
        }
      }
    })
  }
  /* 全局Confirm */
  Vue.prototype.$baseConfirm = (title, content, callback1, callback2) => {
    Modal.confirm({
      title: title || '温馨提示',
      content: content,
      onOk: () => {
        if (callback1) {
          callback1()
        }
      },
      onCancel: () => {
        if (callback2) {
          callback2()
        }
      }
    })
  }

  /* 右侧弹出Message全局Notification */
  Vue.prototype.$baseNotify = (title, message, type, duration) => {
    Notice[type || 'success']({
      title: title,
      desc: message,
      duration: duration || 3
    })
  }

  /* 全局事件总线 */
  Vue.prototype.$baseEventBus = new Vue()
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install

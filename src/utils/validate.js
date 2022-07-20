/*
 * 常用正则表达式
 * @Author: mikey.yc
 * @Date: 2021-09-13 13:24:28
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-09-14 10:18:01
 */
/**
 * @param {string} path
 * @description 判读是否为外链
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
   * @param {string} str
   * @returns {Boolean}
   */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
/**
   * @description 表单校验必填和正整数类型
   * @param value
   * @returns {boolean}
   */
export const validateNum = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入必填数据项'))
  } else if (!/^[1-9]([0-9])*$/.test(value)) {
    callback(new Error('请输入正整数'))
  }
  callback()
}
/**
   * @description 判断是否为数字
   * @param value
   * @returns {boolean}
   */
export function isNumber(value) {
  const reg = /^[0-9]*$/
  return reg.test(value)
}
/**
   * @description 判断是否为IP
   * @param ip
   * @returns {boolean}
   */
export function isIP(ip) {
  const reg =
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip)
}
/**
   * @description 判断是否是端口号
   * @param str
   * @returns {boolean}
   */
export function isPort(str) {
  const reg =
      /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
  return reg.test(str)
}
/**
   * @description 判断是否是手机号
   * @param str
   * @returns {boolean}
   */
export function isPhone(str) {
  const reg = /^1\d{10}$/
  return reg.test(str)
}
/**

   * @description 判断是否是邮箱
   * @param str
   * @returns {boolean}
   */
export function isEmail(str) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return reg.test(str)
}
/**

   * @description 判断是否是身份证号(第二代)
   * @param str
   * @returns {boolean}
   */
export function isIdCard(str) {
  const reg =
      /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(str)
}
/**
   * @description 判断是否为空
   * @param str
   * @returns {boolean}
   */
export function isBlank(str) {
  return (
    str == null ||
      false ||
      str === '' ||
      str.trim() === '' ||
      str.toLocaleLowerCase().trim() === 'null'
  )
}


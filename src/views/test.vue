<template>
  <div class="container-fluid">
    test
  </div>
</template>
<script src="https://www.jq22.com/jquery/jquery-1.10.2.js"></script>
<script>
export default {
  data() {
    return {
      form: {}
    }
  },
  mounted() {
    var lastId = ''
    $('#captcha').sliderCaptcha({
      repeatIcon: 'fa fa-redo',
      setSrc: function() {
        var ids = [10, 237, 626, 643, 796, 173, 501]
        if (lastId) ids.splice(ids.indexOf(lastId), 1)
        var rand = Math.floor(Math.random() * ids.length)
        var id = ids[rand]
        lastId = id
        return 'https://www.huiborobot.com.cn:3183/static/valid/imgs/' + id + '-288x155.jpg'
      },
      onSuccess: function() {
        alert('验证通过!')
      }
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped></style>

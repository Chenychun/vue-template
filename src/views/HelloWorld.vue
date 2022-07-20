<template>
  <div class="container-fluid">
    <div class="form-row">
      <div class="col-12">
        <div class="slidercaptcha card">
          <div class="card-header"><span>请完成安全验证</span></div>
          <div class="card-body">
            <div id="captcha"></div>
          </div>
        </div>
      </div>
    </div>
    <Button @click="toTest">跳转</Button>
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
  methods: {
    toTest() {
      history.pushState('', '', '/test')
    }
  }
}
</script>
<style lang="scss" scoped></style>

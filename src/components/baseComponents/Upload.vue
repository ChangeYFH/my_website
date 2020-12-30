<template>
  <div class="upload">
    <label>仅支持jpg, png格式，大小5M以内的图片</label>
    <button @click.prevent="open">上传图片</button>
    <input type="file" ref="file" @change="upload"/>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import { bucket } from '../../config.js'

function generateUUID () {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
};

export default {
  name: 'Upload',
  methods: {
    open () {
      this.$refs.file.click()
    },
    upload (event) {
      // 生成图片名称
      const uuid = generateUUID()
      const index = event.target.files[0].name.indexOf('.')
      const extension = event.target.files[0].name.slice(index)
      const fileName = uuid + extension
      // 上传图片
      const cos = new COS({
        SecretId: bucket.SecretId,
        SecretKey: bucket.SecretKey
      })
      cos.putObject({
        Bucket: bucket.Bucket,
        Region: bucket.Region,
        Key: fileName,
        StorageClass: bucket.StorageClass,
        Body: event.target.files[0]
      }, (err, data) => {
        // 图片上传成功触发uploaded-success事件，失败触发uploaded-error事件
        if (data) {
          this.$emit('uploaded-success', `https://website-1301851322.cos.ap-beijing.myqcloud.com/${fileName}`)
        } else {
          this.$emit('uploaded-error', err)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload{
    display:inline-block;
    input{
      display: none;
    }
    label{
      display: block;
    }
    button{
      width:80px;
      height:30px;
      font-size:12px;
      margin-top:10px;
    }
  }
</style>

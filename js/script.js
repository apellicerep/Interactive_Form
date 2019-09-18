//poner el cursor en el input al inicio
$('#name').focus()

const $otherJob = $('#other-rolejob')
$otherJob.hide()


$('select').change(function () {
    if (this.value == "other") $otherJob.show() //this actua como event.target
})



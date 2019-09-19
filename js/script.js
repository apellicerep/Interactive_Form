//poner el cursor en el input al inicio
$('#name').focus()

const $otherJob = $('#other-rolejob')
$otherJob.hide()

//Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.
const $selectTheme = $('#design option:eq(0)')
$selectTheme.hide()



const $selectColor = $('#color option:lt(7)')
$selectColor.hide()

const $selectThemeColor = $('#color option:eq(0)')



$('#title').change(function () {
    if (this.value === "other") {
        $otherJob.show() //this actua como event.target
    } else {
        $otherJob.hide()
    }

})

$('#design').change(function () {
    if (this.value === "js puns") {
        $selectColor.hide()
        $('#color option:lt(4)').show()
        $selectThemeColor.hide()
        $('#color option').removeAttr('selected')
        $('#color option:eq(1)').attr('selected', 'true')
    } else {
        $selectColor.hide()
        $('#color option:gt(3)').show()
        $selectThemeColor.hide()
        $('#color option').removeAttr('selected')
        $('#color option:eq(4)').attr('selected', 'true')
    }

})

//REGISTER ACTIVITIES

//Creating an element to display the total activity cost
var cost = 0;
const $cost = $(`<span class="cost">Total Cost:</span>`)
$('.activities').append($cost)

const activities = document.querySelectorAll('.activities input')
console.log(activities)

//listening for changes
$('.activities').on('change', function (event) {
    //console.log(event.target.attributes)
    if (event.target.checked) {
        //get price and slice to remove dollar sign and then parseInt from string to Int.
        let tempCost = parseInt(event.target.attributes.data_cost.value.slice(1))
        let tempDate

        if (event.target.hasAttribute('data_day_and_time')) {
            tempDate = event.target.attributes.data_day_and_time.value
        } else {
            tempDate = false
        }
        cost += tempCost
        $('.cost').text(`Total Cost: $${cost}`)//change cost in DOM.

        if (tempDate) {
            for (let i = 1; i < activities.length; i++) {
                if (tempDate === activities[i].attributes.data_day_and_time.value) {
                    activities[i].disabled = 'true'
                    console.log(activities[i])
                }

            }
            event.target.disabled = ''
        }

    } else {
        let tempCost = parseInt(event.target.attributes.data_cost.value.slice(1))
        cost -= tempCost
        console.log(cost)
        $('.cost').text(`Total Cost: $${cost}`)
        let tempDate
        if (event.target.hasAttribute('data_day_and_time')) {
            tempDate = event.target.attributes.data_day_and_time.value
        } else {
            tempDate = false
        }
        for (let i = 1; i < activities.length; i++) {
            if (tempDate === activities[i].attributes.data_day_and_time.value) {
                activities[i].disabled = ''
                console.log(activities[i])
            }

        }
    }

});




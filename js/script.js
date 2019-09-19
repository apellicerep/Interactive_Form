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


// PAYMENT SECTION

$('#payment option:eq(0)').hide()
console.log($('.payment option:eq(0)'))

$('#payment option:eq(1)').attr('selected', 'true')
console.log($('.payment option:eq(1)'))


$('#paypal').hide()
$('#bitcoin').hide()


$('#payment').change(function () {

    let payment = this.value
    switch (payment) {
        case "Credit Card":
            $('#paypal').hide()
            $('#bitcoin').hide()
            $('#credit-card').show()
            break;
        case "PayPal":
            $('#credit-card').hide()
            $('#bitcoin').hide()
            $('#paypal').show()
            break;
        case "Bitcoin":
            $('#paypal').hide()
            $('#credit-card').hide()
            $('#bitcoin').show()
            break;
    }
})


//FORM VALIDATION

$(`<label class="error" id="name_error" style="color:red">Name field can't be blank</label><br>`).insertAfter("#name")
$(`<label class="error" id="email_error" style="color:red">No valid email formatt</label><br>`).insertAfter("#mail")
$(`<label class="error" id="act_error" style="color:red">You must select on activity</label><br>`).insertAfter(".cost")
$(`<label class="error" id="cardNum_error" style="color:red">Credit Card field should only accept a number between 13 and 16 digits.</label><br>`).insertAfter("#cc-num")
$(`<label class="error" id="zipCode_error" style="color:red">The Zip Code field should be a 5-digit number.</label><br>`).insertAfter("#zip")
$(`<label class="error" id="cvv_error" style="color:red">The CVV should be exactly 3 digits long</label><br>`).insertAfter('#cvv')

$('.error').hide()


$('button').on("click", function (event) {
    $('.error').hide()
    event.preventDefault()
    let name = $('#name').val()
    let mail = $('#mail').val()
    let cardNum1 = parseInt($('#cc-num').val())
    let zipCode = parseInt($('#zip').val())
    let cVv = parseInt($('#cvv').val())
    let errorValidation = 0;
    console.log(cardNum1)


    if (validateName(name)) { errorValidation++ }

    if (validateEmail(mail)) { errorValidation++ }

    if (validateActivities(activities)) { errorValidation++ }

    if (!document.querySelector('#payment').childNodes[1].selected) {
        if (validateCreditCard(cardNum1, zipCode, cVv)) { errorValidation++ }

    }

    if (errorValidation === 0) {
        $('form').submit();
    }

})


function validateName(name) {
    if (name === '') {
        $('#name_error').show()
        return true
    } return false
}


function validateEmail(mail) {
    var re = /\S+@\S+\.\S+/;
    if (!re.test(mail)) {
        $('#email_error').show()
        return true
    } return false
}

function validateActivities(activities) {
    let check = false;
    for (element of activities) {
        if (element.checked) {
            check = true;
            break;
        }
    }
    if (!check) {
        $('#act_error').show()
        return true
    } return false
}

function validateCreditCard(cardNum1, zipCode, cVv) {
    console.log(!isNaN(cardNum1))
    let check = 0;
    if (!((cardNum1.toString().length > 13) && (cardNum1.toString().length < 16)) || isNaN(cardNum1)) { $('#cardNum_error').show(); check++; }
    if (!((zipCode.toString().length === 5) && !isNaN(zipCode))) { $('#zipCode_error').show(); check++; }
    if (!((cVv.toString().length === 3) && !isNaN(cVv))) { $('#cvv_error').show(); check++ }
    if (check != 0) { return true } return false

}




//event handeler remove validate errors.

const form = document.querySelector('form')
form.addEventListener('click', function (e) {
    switch (e.target.id) {
        case "name":
            $('#name_error').hide()
            break;

        case "mail":
            $('#email_error').hide()
            break;

        case "cc-num":
            $('#cardNum_error').hide()
            break;

        case "zip":
            $('#zipCode_error').hide()
            break;

        case "cvv":
            $('#cvv_error').hide()
            break;
    }
})

$('.activities').change(function () {
    $('#act_error').hide()

})




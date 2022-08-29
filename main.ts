function call_RevisarHumedadSuelo () {
    if (humedadsuelo < humedadparariego) {
        call_encender_riego()
        while (humedadsuelo < humedadparariego && valorsensorlluvia < sensorlluviamojado) {
        	
        }
    }
}
input.onButtonPressed(Button.A, function () {
    call_encender_riego()
})
function call_apagar_riego () {
    pins.digitalWritePin(DigitalPin.P16, 0)
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
}
function estaencendidoriego () {
    return pins.digitalReadPin(DigitalPin.P16)
}
input.onButtonPressed(Button.B, function () {
    call_apagar_riego()
})
function call_MostrarNivelAgua () {
    if (niveldeposito < alarmanivelagua) {
        if (estaencendidoriego() == 1) {
            estaencendidoriego()
        }
        basic.showLeds(`
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            `)
    } else if (niveldeposito < 1.25 * alarmanivelagua) {
        basic.showLeds(`
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            # # # # #
            `)
    } else if (niveldeposito < 1.5 * alarmanivelagua) {
        basic.showLeds(`
            # . . . #
            # . . . #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else if (niveldeposito < 1.75 * alarmanivelagua) {
        basic.showLeds(`
            # . . . #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
}
function call_encender_riego () {
    if (niveldeposito > alarmanivelagua) {
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    }
}
function call_MedidaSensores () {
    niveldeposito = pins.analogReadPin(AnalogPin.P2)
    serial.writeValue("niveldeposito", niveldeposito)
    valorsensorlluvia = pins.analogReadPin(AnalogPin.P1)
    serial.writeValue("sensorlluvia", valorsensorlluvia)
    humedadsuelo = pins.analogReadPin(AnalogPin.P0)
    serial.writeValue("humedadsuelo", humedadsuelo)
}
let niveldeposito = 0
let valorsensorlluvia = 0
let humedadsuelo = 0
let sensorlluviamojado = 0
let humedadparariego = 0
let alarmanivelagua = 0
serial.redirectToUSB()
alarmanivelagua = 400
humedadparariego = 500
sensorlluviamojado = 800
basic.forever(function () {
    call_MedidaSensores()
    call_MostrarNivelAgua()
    call_RevisarHumedadSuelo()
})

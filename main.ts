//  Variables globals
let mode = 0
//  0 = Espera, 1 = Temps, 2 = Gota
let x = 2
//  Posició inicial X de la gota
let y = 2
//  Posició inicial Y de la gota
//  --- FUNCIONS DELS REPTES (Modularitat) ---
function funcio_temps() {
    //  REPTE 6: Estació Meteorològica
    //  Mostra un gràfic de barres de la temperatura fins a 50 graus
    led.plotBarGraph(input.temperature(), 50)
}

function funcio_gota() {
    //  REPTE 7: Moure la Gota
    
    //  1. Encén el LED a la posició actual
    led.plot(x, y)
    basic.pause(50)
    led.unplot(x, y)
    //  2. Llegeix l'acceleròmetre (inclinació)
    let acc_x = input.acceleration(Dimension.X)
    let acc_y = input.acceleration(Dimension.Y)
    //  3. Lògica de moviment Eix X (Esquerra/Dreta)
    //  Si s'inclina a l'esquerra (< -150) i no estem a la vora
    if (acc_x < -150 && x > 0) {
        x = x - 1
    } else if (acc_x > 150 && x < 4) {
        //  Si s'inclina a la dreta (> 150) i no estem a la vora
        x = x + 1
    }
    
    //  4. Lògica de moviment Eix Y (Amunt/Avall)
    //  Si s'inclina endavant (< -150)
    if (acc_y < -150 && y > 0) {
        y = y - 1
    } else if (acc_y > 150 && y < 4) {
        //  Si s'inclina endarrere (> 150)
        y = y + 1
    }
    
}

//  --- CONTROL DEL MENÚ (Botons) ---
input.onButtonPressed(Button.A, function on_button_a_pressed() {
    
    mode = 1
    //  Activa el mode "Temps"
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function on_button_b_pressed() {
    
    mode = 2
    //  Activa el mode "Gota"
    basic.clearScreen()
})
//  --- BUCLE PRINCIPAL (Per sempre) ---
basic.forever(function on_forever() {
    if (mode == 1) {
        funcio_temps()
    } else if (mode == 2) {
        funcio_gota()
    } else {
        //  Mostra una icona d'espera si no s'ha triat res
        basic.showIcon(IconNames.Happy)
    }
    
})

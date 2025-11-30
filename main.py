# Variables globals
mode = 0  # 0 = Espera, 1 = Temps, 2 = Gota
x = 2     # Posició inicial X de la gota
y = 2     # Posició inicial Y de la gota

# --- FUNCIONS DELS REPTES (Modularitat) ---

def funcio_temps():
    # REPTE 6: Estació Meteorològica
    # Mostra un gràfic de barres de la temperatura fins a 50 graus
    led.plot_bar_graph(input.temperature(), 50)

def funcio_gota():
    # REPTE 7: Moure la Gota
    global x, y
    
    # 1. Encén el LED a la posició actual
    led.plot(x, y)
    basic.pause(50)
    led.unplot(x, y)
    
    # 2. Llegeix l'acceleròmetre (inclinació)
    acc_x = input.acceleration(Dimension.X)
    acc_y = input.acceleration(Dimension.Y)
    
    # 3. Lògica de moviment Eix X (Esquerra/Dreta)
    # Si s'inclina a l'esquerra (< -150) i no estem a la vora
    if acc_x < -150 and x > 0:
        x = x - 1
    # Si s'inclina a la dreta (> 150) i no estem a la vora
    elif acc_x > 150 and x < 4:
        x = x + 1
        
    # 4. Lògica de moviment Eix Y (Amunt/Avall)
    # Si s'inclina endavant (< -150)
    if acc_y < -150 and y > 0:
        y = y - 1
    # Si s'inclina endarrere (> 150)
    elif acc_y > 150 and y < 4:
        y = y + 1

# --- CONTROL DEL MENÚ (Botons) ---

def on_button_a_pressed():
    global mode
    mode = 1  # Activa el mode "Temps"
    basic.clear_screen()
input.on_button_pressed(Button.A, on_button_a_pressed)

def on_button_b_pressed():
    global mode
    mode = 2  # Activa el mode "Gota"
    basic.clear_screen()
input.on_button_pressed(Button.B, on_button_b_pressed)

# --- BUCLE PRINCIPAL (Per sempre) ---

def on_forever():
    if mode == 1:
        funcio_temps()
    elif mode == 2:
        funcio_gota()
    else:
        # Mostra una icona d'espera si no s'ha triat res
        basic.show_icon(IconNames.HAPPY)

basic.forever(on_forever)

# import pyautogui
# import time
 
# pyautogui.FAILSAFE = False
 
# print("Starting in 3 seconds...")
# time.sleep(3)
 
# scroll_interval = 240  # 4 minutes
# last_scroll = time.time()
 
# try:
#     while True:
#         # Move mouse in a square
#         pyautogui.moveRel(100, 0, duration=0.5)
#         pyautogui.moveRel(0, 100, duration=0.5)
#         pyautogui.moveRel(-10, 0, duration=0.5)
#         pyautogui.moveRel(0, -300, duration=0.9)
#         pyautogui.moveRel(35, 100, duration=0.5)
#         pyautogui.moveRel(-90, 78, duration=0.5)
#         pyautogui.moveRel(8, -40, duration=0.5)
 
#         time.sleep(1)
 
#         # Scroll down every 4 minutes
#         if time.time() - last_scroll >= scroll_interval:
#             pyautogui.scroll(-3)  # negative = scroll down
#             print("Scrolled down.")
#             last_scroll = time.time()
 
# except KeyboardInterrupt:
#     print("\nStopped by user.")

import pyautogui                                                                                                                                                                              
import time                                                                                                                                                                                   
pyautogui.FAILSAFE = False                                                                                                                                                                    
 
time.sleep(3)
 
tab_switch_interval = 120
last_tab_switch = time.time()
 
try:
    while True:
        pyautogui.moveRel(100, 0, duration=0.5)
        pyautogui.moveRel(0, 100, duration=0.5)
        pyautogui.moveRel(-100, 0, duration=0.5)
        pyautogui.moveRel(0, -100, duration=0.5)
        time.sleep(1)
 
        if time.time() - last_tab_switch >= tab_switch_interval:
            pyautogui.hotkey('ctrl', 'tab')
            last_tab_switch = time.time()
 
            for _ in range(3):
                pyautogui.press('down')
                time.sleep(0.1)
 
            print("Cursor moved 3 lines down.")
 
except KeyboardInterrupt:
    print("\nStopped by user.")
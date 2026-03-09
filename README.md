# 2dFleet

**2dFleet** is a 2D space trading and exploration game built with **Node.js** and **Express.js**.
The game is played from a **side view**, similar to the style of FTL-like games.

Players travel between star systems, dock at stations through a small landing minigame, and trade goods to earn credits.

---

# Core Screens

The game has four main screens:

1. **Landing**
2. **Maps**
3. **Travel**
4. **Shop**

---

# 1. Landing (Docking Minigame)

Docking is a **small skill-based minigame**.

The player must guide the ship into the **space station docking port**.

If docking succeeds, the player gains access to the **Shop**.

When leaving the station, the same sequence plays **in reverse** as an undocking sequence.

### Mechanics

* Side-view flight
* Align with docking corridor
* Control speed
* Enter the docking zone safely

### Result

* Success → access **Shop**
* Fail → return to **Travel**

---

# 2. Maps

There are two maps.

## Solar System Map

Shows the **current star system**.

Objects shown:

* Star
* Planets
* Space stations
* Player ship

Players can select a **station** or **planet** as a destination.

---

## Galactic Map

Shows nearby **star systems**.

Players can:

* Select a system
* See distance
* Check fuel range
* Start a hyperspace jump

---

# 3. Travel

Travel is a **side-view flight screen**.

The ship accelerates toward its destination and slows down automatically when approaching it.

### Features

* Exponential acceleration
* Distance tracking
* Arrival detection

Maximum speeds can reach extremely high levels for long-distance travel.

Destinations include:

* Space stations
* Star systems

---

# 4. Shop

The shop is available **only after successful docking**.

Players can trade commodities.

### Actions

* Buy goods
* Sell goods
* Manage cargo
* View credits

### Example Commodities

* Food
* Textiles
* Minerals
* Machinery
* Technology
* Medicine

Prices vary between star systems.

---

# Gameplay Loop

1. Dock at a station
2. Open **Shop**
3. Buy or sell goods
4. Launch (undocking minigame)
5. Open **Map**
6. Choose destination
7. **Travel**
8. Dock again
9. Repeat

---

# Tech Stack

Backend

* Node.js
* Express.js
* JSON save data

Frontend

* HTML
* CSS
* JavaScript
* Canvas rendering
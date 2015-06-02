# linked grid

The LinkedGrid class should offer a two-dimensional array to handle field cell references. 
Additionally the class should contain a array for all field cells to handle more specific data:
* Reference to pixi.js GFX element
* Column value
* Row value
* Color index value

Class properties:
* field size rows
* field size columns
* array with cell color values
* array with cell objects
* max index value of array with cell objects
* 2d array with cell references

Class methods:
* set field size
* add cell color
* add cell (position, color index)
* remvoe cell (position)
* move cell (old position, new position)

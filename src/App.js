import React, { Component } from 'react';
import GameControls from './GameControls.js'
import Board from './Board.js'
import './App.css';

var BOARD_WIDTH = 500
, BOARD_HEIGHT = 500
, CELL_SIZE = 20
, NUM_ROWS = BOARD_WIDTH / CELL_SIZE
, NUM_COLS = BOARD_HEIGHT / CELL_SIZE
, INTERVAL = 500

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      matrix: this.initializeMatrix()
    , generation: 0
    }
  }

  componentWillUnmount () {
    if (this.interval) clearInterval(this.interval)
  }

  initializeMatrix () {
    return new Array(NUM_ROWS)
      .fill(new Array(NUM_ROWS).fill())
      .map((row, rowIdx) => {       
        return row.map((cell, colIdx) => {
          return {
            alive: false
          , x: rowIdx
          , y: colIdx
          }
        })
      })
  }

  getNextGeneration (previousGen) {
    const prev = [...previousGen]
    return prev.map((row) => {
      return row.map((cell) => {
        const n = this.checkNeighbors(cell.x, cell.y, previousGen)
        if (cell.alive > 0) {
          if (n === 2 || n === 3) cell.alive += 1
          else cell.alive = 0
        }
        else if (n === 3) {
          cell.alive = 1
        }
        else cell.alive = 0
        return cell
      })
    })
  }

  indexInBounds (x, y) {
    return x >= 0 && y >=0 && x < NUM_ROWS && y < NUM_COLS
  }

  checkNeighbors (x, y, matrix) {
    const neighbors = [
      [x+1, y]
    , [x, y+1]
    , [x+1, y+1]
    , [x-1, y]
    , [x, y-1]
    , [x-1, y-1]
    , [x+1, y-1]
    , [x-1, y+1]
    ]

    // count the alive neighbors
    return neighbors.reduce((count, coords) => {
      const inBounds = this.indexInBounds(coords[0], coords[1])
      if (!inBounds) return count

      const neighborCell = matrix[coords[0]][coords[1]]
      if (neighborCell.alive) count++
      
      return count
    }, 0)
  }

  onBoardClick (index) {
    const {matrix} = this.state
    // toggle the active state
    const {alive} = matrix[index.x][index.y]
    matrix[index.x][index.y].alive = !!alive ? 0 : 1
    this.setState({matrix})
  }

  onBoardClear () {
    console.log('clearing...')
    clearInterval(this.interval)
    const empty = this.state.matrix.map((row) => {
      return row.map((cell) => {
        cell.alive = 0
        return cell
      })
    })
    this.setState({matrix: empty, generation: 0})
  }

  onGameStart () {
    // kick it off!
    this.interval = window.setInterval(() => {
      this.setState({
        matrix: this.getNextGeneration(this.state.matrix)
      , generation: this.state.generation + 1
      })
    }, INTERVAL)
  }

  onGamePause () {
    clearInterval(this.interval)
  }

  render () {
    return (
      <div className="App">
        <Board
          matrix={this.state.matrix}
          onChange={this.onBoardClick.bind(this)}
          width={BOARD_WIDTH}
          height={BOARD_HEIGHT}
          cellSize={CELL_SIZE}
        /><br />
            <GameControls 
              onGameStart={this.onGameStart}
              onGamePause={this.onGamePause}
              onBoardClear={this.onBoardClear}
              generation={this.state.generation}
            />
      </div>
    )
  }
}

export default App;

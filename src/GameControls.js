import React, {Component, PropTypes} from 'react'
import './GameControls.css'

export default class GameControls extends Component {
	static propTypes = {
		generation: PropTypes.number
	, onGameStart: PropTypes.func
	, onGamePause: PropTypes.func
	, onBoardClear: PropTypes.func
	}

	static defaultProps = {
		generation: 0
	, onGameStart: () => {}
	, onGamePause: () => {}
	, onBoardClear: () => {}
	}

	render () {
		const {onGameStart, onGamePause, onBoardClear, generation} = this.props

		return (<div className="GameControls">
		  <button className="GameControls-btn" onClick={onGameStart}>Run</button>
		  <button className="GameControls-btn" onClick={onGamePause}>Pause</button>
		  <button className="GameControls-btn"onClick={onBoardClear}>Clear</button>
		  <p className="GameControls-generation">Generation: {generation}</p>
		</div>)
	}
}

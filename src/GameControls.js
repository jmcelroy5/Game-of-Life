import React, {Component, PropTypes} from 'react'
import './GameControls.css'

export default class GameControls extends Component {
	static propTypes = {
		generation: PropTypes.number
	, onGameStart: PropTypes.func
	, onGamePause: PropTypes.func
	, onGameReset: PropTypes.func
	}

	static defaultProps = {
		generation: 0
	, onGameStart: () => {}
	, onGamePause: () => {}
	, onGameReset: () => {}
	}

	render () {
		const {onGameStart, onGamePause, onGameReset, generation} = this.props

		return (<div className="GameControls">
		  <button className="GameControls-btn" onClick={onGameStart}>Run</button>
		  <button className="GameControls-btn" onClick={onGamePause}>Pause</button>
		  <button className="GameControls-btn"onClick={onGameReset}>Reset</button>
		  <p className="GameControls-generation">Generation: {generation}</p>
		</div>)
	}
}

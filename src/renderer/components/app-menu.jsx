import React from 'react'
import { connect } from 'react-redux'
import {
  AppBar,
  ToolbarGroup,
  TextField,
  FontIcon,
} from 'material-ui'
import theme from 'material-ui/styles/baseThemes/lightBaseTheme'
import { events } from '../redux/actions'

/**
 * Main Application Menu Component
 *
 * @param   {Object}      props     React props to be passed to the component
 * @return  {DOMNode}
 */
class AppMenu extends React.Component {

  static propTypes = {
    filter: React.PropTypes.func.isRequired,
    filterValue: React.PropTypes.string.isRequired,
  }

  onFilterChange(text) {
    this.props.filter(text)
  }

  render() {
    const iconStyle = {
      marginRight: 8,
      color: theme.palette.alternateTextColor
    }

    return (
      <AppBar
        showMenuIconButton={false}
        title=""
        style={{ position: 'fixed', width: '100%' }}
      >
        <ToolbarGroup>
          <FontIcon className="material-icons" style={iconStyle}>search</FontIcon>
          <TextField
            id="events-filter"
            name="events-filter"
            hintText="Filter events..."
            value={this.props.filterValue}
            onChange={event => this.onFilterChange(event.target.value)}
            hintStyle={{ color: theme.palette.alternateTextColor }}
            inputStyle={{ color: theme.palette.alternateTextColor }}
            underlineFocusStyle={{ borderColor: theme.palette.alternateTextColor }}
          />
        </ToolbarGroup>
      </AppBar>
    )
  }
}

/**
 * Map state to component props
 *
 * @private
 * @param     {Object}    state    Redux state
 * @return    {Object}
 */
function mapState(state) {
  return {
    filterValue: state.events.getIn(['meta', 'filter']),
  }
}

const mapDispatch = {
  filter: events.filter
}

export default connect(mapState, mapDispatch)(AppMenu)

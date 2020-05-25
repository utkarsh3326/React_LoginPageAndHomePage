import Identity from "lodash/identity";
import PropTypes from "prop-types";
import React from "react";

import HomePageHeader from "./HomePageHeader";
import ListItem from "./ListItem";

import { Data } from "../../utility/Data";

import "../../App.css";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      clearSelectionState: true,
      listItemNo: null,
      listNo: null,
    };
    this.showDesc = this.showDesc.bind(this);
    this.showList = this.showList.bind(this);
  }

  // for enabling and disabling clear selection button and containing list index for showing it
  showList(index) {
    if (index === null) {
      this.setState({ clearSelectionState: true });
    } else if (index != null && this.state.clearSelectionState) {
      this.setState({ clearSelectionState: false });
    }
    this.setState({ listNo: index });
    this.setState({ listItemNo: null });
  }

  // for containing list item index on onClick
  showDesc(index) {
    this.setState({ listItemNo: index });
  }

  // to return list on select any categories
  showListItem(listItemNo, listNo) {
    return listNo != null ? (
      <ListItem
        listItems={Data.categories[listNo].items}
        listItemNo={listItemNo}
        showDesc={this.showDesc}
      />
    ) : null;
  }

  render() {
    const { clearSelectionState, listItemNo, listNo } = this.state;
    return (
      <div>
        <button className="logout" onClick={this.props.jumpToHomePage}>
          Log Out
        </button>
        <button
          className="clear-selection"
          style={
            clearSelectionState
              ? { backgroundColor: "lightseagreen" }
              : { backgroundColor: "red" }
          }
          disabled={clearSelectionState}
          onClick={() => this.showList(null)}
        >
          clear selection
        </button>
        <HomePageHeader
          categories={Data.categories}
          showList={this.showList}
          listNo={listNo}
        />
        {this.showListItem(listItemNo, listNo)}
      </div>
    );
  }
}

HomePage.defaultProps = {
  jumpToHomePage: Identity,
};

HomePage.propTypes = {
  jumpToHomePage: PropTypes.func,
};

export default HomePage;

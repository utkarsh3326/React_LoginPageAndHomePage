import Identity from "lodash/identity";
import PropTypes from "prop-types";
import React from "react";

import "../../App.css";

class ListItem extends React.Component {
  showDesc = (index, showDesc) => {
    return () => showDesc(index);
  };

  // for returning  categories items list
  showListItems(listItemNo, listItems, showDesc) {
    let list = listItems.map((listItem, index) => {
      const listStyle =
        listItemNo === index ? { backgroundColor: "pink" } : null;
      return (
        <li
          style={listStyle}
          key={listItem.id}
          onClick={this.showDesc(index, showDesc)}
        >
          {listItem.name}
        </li>
      );
    });
    return list;
  }

  // to return description of list item on select list item
  showDescPart(listItemNo, listItems) {
    return listItemNo !== null ? (
      <div className="desc">{listItems[listItemNo].description}</div>
    ) : null;
  }

  render() {
    const { listItemNo, listItems, showDesc } = this.props;
    const listStyle = { listStyleType: "none" };
    return (
      <div className="bottom-part">
        <div className="list-item">
          <ul style={listStyle}>
            {this.showListItems(listItemNo, listItems, showDesc)}
          </ul>
        </div>

        {this.showDescPart(listItemNo, listItems)}
      </div>
    );
  }
}

ListItem.defaultProps = {
  listItemNo: null,
  listItems: Array(0),
  showDesc: Identity,
};

ListItem.propTypes = {
  listItemNo: PropTypes.number,
  listItems: PropTypes.array,
  showDesc: PropTypes.func,
};

export default ListItem;

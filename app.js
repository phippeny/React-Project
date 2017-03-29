var App = React.createClass({

  getInitialState: function () {
    return {
      searchResults: [{ result: {} }]
    }
  },

  showResults: function (response) {
    this.setState({
      searchResults: response.results
    })
  },

  search: function (URL) {
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: URL,
      success: function (response) {
        this.showResults(response);
      }.bind(this)
    });
  },

  render: function () {
    return (
      <div>
        <SearchBox search={this.search} />
        <Results searchResults={this.state.searchResults} />
      </div>
    );
  },


});

var SearchBox = React.createClass({
  render: function () {
    var formStyle = {
      background: "#e1e1e1",
      width: 365,
      margin: "100px auto",
      borderRadius: 17,
      boxShadow: "1px 1px 2px rgba(0,0,0,.3), 0 0 2px rgba(0,0,0,.3)",
    };

    var barStyle = {
      background: "#fafafa",
      padding: 10,
      margin: 10,
      display: "inline",
      border: 0,
      borderBottom: "1px solid #fff",
      borderRight: "1px solid rgba(255, 255, 255, .8)",
      fontSize: 16,
      margin: 4,
      padding: 5,
      width: 250,
      borderRadius: 17,
      boxShadow: "-1px -1px 2px rgba(0,0,0,.3), 0 0 1px rgba(0,0,0,.2)",
    };

    var btnStyle = {
      background: "#44921f",
      border: 0,
      color: "#eee",
      cursor: "pointer",
      float: "right",
      font: "16px 'Raleway', sans-serif",
      fontWeight: "bold",
      height: 30,
      margin: "4px 4px 0",
      textShadow: "0 -1px 0 rgba(0,0,0,.3)",
      width: 84,
      outline: "none",
      borderRadius: 30,
      boxShadow: "-1px -1px 1px rgba(255,255,255,.5), 1px 1px 0 rgba(0,0,0,.4)",
    };



    return (
      <div style={formStyle}>
        <input type="text" ref="query" style={barStyle} placeholder="Search by Title" />
        <input type="submit" style={btnStyle} onClick={this.createAjax} />
      </div>
    );
  },

  createAjax: function () {
    var query = ReactDOM.findDOMNode(this.refs.query).value;
    var URL = 'http://www.omdbapi.com/?t=' + query;
    this.props.search(URL)
  }

});

var Results = React.createClass({

  render: function () {
    var resultItems = this.props.searchResults.map(function (result) {
      return <ResultItem key={result.imdbId} Title={result.Title} />
    });
    
    return (
      <div>
        {resultItems.Title}
      </div>
    );
  }
});
var ResultItem = React.createClass({

  render: function () {
    return <li>{this.props.title}</li>;
  }
});

ReactDOM.render(<App />, document.getElementById("content"));
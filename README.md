# [Gulp, React, Babel, Browserify, Browser-Sync](https://github.com/n0m0r3pa1n/babel_browserify_gulp_react_template) - Example Project

## Installation
After cloning the repository, install dependencies:
```
cd <project folder>
npm install
```

Fix react-datepicker-component project which is not updated in the npm repository in:
node_modules -> react-datepicker-component -> DatePickerInput 63 row which contains this.transferProps to

```
<DatePicker {...this.props} date={this.props.date} show={this.state.show} onChangeDate={this.onChangeDate} />
```

Now you can run your local server:
```
npm start
```
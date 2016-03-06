# AppHunt Admin

This is the admin panel for the AppHunt project.

# What is this about?

From this panel you can:

* Approve/Reject/Edit/Delete apps
* Create app/user collections
* Review stats about how is the Android app doing
* Review user actions

# Installation
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

# Purpose:

This app was built to compare between 2 data of the same type but different time (old and new) to update the/a system with the latest data (using excelsheets).

# How it works:

You select 2 excel files to cmopare against each other, the first one is supposed to be the old one and the second one should be the new latest excel data, when you upload them, each of them is converted to a JSON data and stored in state.

When you click on compare, the new data is checked against the old one and data that exists on the new excel sheet and doesnt exist on the old one is being filtered and saved in another state that is displayed on the screen.

Upon clicking on Export, this saved filtered JSON data is converterd back to an excel data and exported using a template custom to my use case.

Note that:
This project is custom to my use case but can be adjusted to fit other scenarios.

if you'd like an explanation of a part or you have an optimized solution to this use case, kindly contact me or raise an issue, thanks.

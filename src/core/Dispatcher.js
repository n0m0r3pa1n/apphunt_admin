'use strict';

import Flux from 'flux';
import assign from 'react/lib/Object.assign';

let Dispatcher = assign(new Flux.Dispatcher(), {

    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the server.
     */
    handleServerAction(action) {
        var payload = {
            source: PayloadSources.SERVER_ACTION,
            action: action
        };
        this.dispatch(payload);
    },

    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the view.
     */
    handleViewAction(action) {
        var payload = {
            source: PayloadSources.VIEW_ACTION,
            action: action
        };
        this.dispatch(payload);
    }

});
let a = "dadsadas"
console.log(a);
console.log(a);
console.log(a);
console.log(a);
console.log(a);

export default Dispatcher;
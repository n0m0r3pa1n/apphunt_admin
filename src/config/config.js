export var FLURRY_BASE_URL = "http://api.flurry.com/"
export var FLURRY_API_ACCESS_CODE = "K3DM6PJMTV58CRN4MK6Q"
export var FLURRY_API_KEY = "TF65K4T659FTCPXGMNG3"

export var BASE_URL = "https://apphunt.herokuapp.com/"
//export var BASE_URL = "http://localhost:8080/"
export var APP_COMMENTS_URL = BASE_URL + "comments/"
export var APP_COLLECTIONS_URL = BASE_URL + "app-collections"
export var USER_COLLECTIONS_URL = BASE_URL + "user-collections"
export var USERS_URL = BASE_URL + "users"

export var FLURRY_GENERAL_STATS_URL = FLURRY_BASE_URL + "eventMetrics/Summary?apiAccessCode="+FLURRY_API_ACCESS_CODE+"&apiKey=" +
    FLURRY_API_KEY
export var FLURRY_APP_INFO_URL = FLURRY_BASE_URL + "appInfo/getApplication?apiAccessCode="+FLURRY_API_ACCESS_CODE+"&apiKey=" + FLURRY_API_KEY

export const PAGE_SIZE = 20
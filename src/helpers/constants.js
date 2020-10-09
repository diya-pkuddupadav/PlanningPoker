const data = {
    "client_id": "BRphak8h3YqAhP67Jxs0XSnmzrqfYlQn",
    "client_secret":"MFITDWbKbGcWIse1wP3h247LLIGwSl032o4ebP18k-x2AeCgZVeLHEInh6TpwZL8",
    "Callback_URL":"https://atlas-planning-poker.herokuapp.com",
    "YOUR_USER_BOUND_VALUE":"",
    "API":{
        getAuth:'https://auth.atlassian.com/oauth/token'
    },
    "backendURL": "https://planningpockernency.herokuapp.com",
    
}
data.REST_API_authorization_URL = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${data.client_id}&scope=write%3Ajira-work%20read%3Ame%20read%3Ajira-work%20manage%3Ajira-project%20manage%3Ajira-configuration%20manage%3Ajira-data-provider%20read%3Ajira-user%20report:personal-data&redirect_uri=${data.Callback_URL}&state=${data.YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent`

export default data;


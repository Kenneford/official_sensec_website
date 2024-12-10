const config = {
  development: {
    apiUrl: "mongodb://127.0.0.1:27017/sensec_database_local",
  },
  production: {
    apiUrl:
      "mongodb+srv://Kenneford88:CodeWithKenn88.@sensecwebsite.jfazcf0.mongodb.net/sensec_website",
  },
};

const currentEnv = import.meta.env.NODE_ENV || "development";
export default config[currentEnv];

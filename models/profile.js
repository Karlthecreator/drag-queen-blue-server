module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('profile', {
        queenName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        homeTown: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currentTown: {
            type: DataTypes.STRING,
            allowNull: false
        },
        about: {
            type: DataTypes.STRING,
            allowNull: false
        },
        accolades: {
            type: DataTypes.STRING,
            allowNull: false
        },
        upcomingShows: {
            type: DataTypes.STRING,
            allowNull: true
        }
       
    })
    return Profile;
}

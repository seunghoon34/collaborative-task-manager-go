package handlers

import (
	"crypto/rand"
	"encoding/base64"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/seunghoon34/todo-app-go/internal/database"
	"github.com/seunghoon34/todo-app-go/internal/models"
	"gorm.io/gorm"
)

func generateJoinCode() string {
	b := make([]byte, 6)
	rand.Read(b)
	return base64.URLEncoding.EncodeToString(b)[:6]
}

func CreateTeam(c *gin.Context) {
	var team models.Team
	if err := c.ShouldBindJSON(&team); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := c.GetUint("user_id")
	team.OwnerID = userID
	team.JoinCode = generateJoinCode()

	if err := database.DB.Create(&team).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create team"})
		return
	}

	c.JSON(http.StatusCreated, team)
}

func JoinTeam(c *gin.Context) {
	joinCode := c.Param("joinCode")
	userID := c.GetUint("user_id")

	var team models.Team
	if err := database.DB.Where("join_code = ?", joinCode).First(&team).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Team not found"})
		return
	}

	var user models.User
	if err := database.DB.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if err := database.DB.Model(&team).Association("Users").Append(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to join team"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully joined team"})
}

func GetTeam(c *gin.Context) {
	teamID := c.Param("id")
	var team models.Team
	if err := database.DB.Preload("Users").First(&team, teamID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Team not found"})
		return
	}
	c.JSON(http.StatusOK, team)
}

func ListUserTeams(c *gin.Context) {
	userID := c.GetUint("user_id")
	var teams []models.Team
	if err := database.DB.Model(&models.User{Model: gorm.Model{ID: userID}}).Association("Teams").Find(&teams); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch teams"})
		return
	}
	c.JSON(http.StatusOK, teams)
}

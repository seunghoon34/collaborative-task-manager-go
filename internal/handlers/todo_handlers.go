package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/seunghoon34/todo-app-go/internal/database"
	"github.com/seunghoon34/todo-app-go/internal/models"
)

func GetTodos(c *gin.Context) {
	userID := c.GetUint("user_id")
	var todos []models.Todo
	query := database.DB.Where("user_id = ?", userID)

	if teamID := c.Query("team_id"); teamID != "" {
		query = query.Where("team_id = ?", teamID)
	}
	if priority := c.Query("priority"); priority != "" {
		query = query.Where("priority = ?", priority)
	}
	if deadline := c.Query("deadline"); deadline != "" {
		query = query.Where("deadline <= ?", deadline)
	}
	if sortBy := c.Query("sort_by"); sortBy != "" {
		query = query.Order(sortBy)
	}

	if err := query.Find(&todos).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch todos"})
		return
	}
	c.JSON(http.StatusOK, todos)
}

func CreateTodo(c *gin.Context) {
	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := c.GetUint("user_id")
	todo.UserID = userID

	if err := database.DB.Create(&todo).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create todo"})
		return
	}
	c.JSON(http.StatusCreated, todo)
}

// Update UpdateTodo and DeleteTodo similarly to include team checks
func UpdateTodo(c *gin.Context) {
	id := c.Param("id")
	userID := c.GetUint("user_id")

	var todo models.Todo
	if err := database.DB.First(&todo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	// Check if the todo belongs to the user or if the user is part of the team
	if todo.UserID != userID {
		if todo.TeamID != 0 {
			var team models.Team
			if err := database.DB.First(&team, todo.TeamID).Error; err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": "Team not found"})
				return
			}
			var user models.User
			if err := database.DB.First(&user, userID).Error; err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
				return
			}
			if database.DB.Model(&team).Where("id = ?", team.ID).Association("Users").Find(&user).Error != nil {
				c.JSON(http.StatusForbidden, gin.H{"error": "You don't have permission to update this todo"})
				return
			}
		} else {
			c.JSON(http.StatusForbidden, gin.H{"error": "You don't have permission to update this todo"})
			return
		}
	}

	var updatedTodo models.Todo
	if err := c.ShouldBindJSON(&updatedTodo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Prevent changing the owner or team of the todo
	updatedTodo.ID = todo.ID
	updatedTodo.UserID = todo.UserID
	updatedTodo.TeamID = todo.TeamID

	if err := database.DB.Model(&todo).Updates(updatedTodo).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update todo"})
		return
	}

	c.JSON(http.StatusOK, todo)
}

func DeleteTodo(c *gin.Context) {
	id := c.Param("id")
	userID := c.GetUint("user_id")

	var todo models.Todo
	if err := database.DB.First(&todo, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Todo not found"})
		return
	}

	// Check if the todo belongs to the user or if the user is part of the team
	if todo.UserID != userID {
		if todo.TeamID != 0 {
			var team models.Team
			if err := database.DB.First(&team, todo.TeamID).Error; err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": "Team not found"})
				return
			}
			var user models.User
			if err := database.DB.First(&user, userID).Error; err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
				return
			}
			if database.DB.Model(&team).Where("id = ?", team.ID).Association("Users").Find(&user).Error != nil {
				c.JSON(http.StatusForbidden, gin.H{"error": "You don't have permission to delete this todo"})
				return
			}
		} else {
			c.JSON(http.StatusForbidden, gin.H{"error": "You don't have permission to delete this todo"})
			return
		}
	}

	if err := database.DB.Delete(&todo).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete todo"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Todo deleted successfully"})
}

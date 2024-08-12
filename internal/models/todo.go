package models

import (
	"time"

	"gorm.io/gorm"
)

type Todo struct {
	gorm.Model
	Title     string    `json:"title"`
	Completed bool      `json:"completed"`
	UserID    uint      `json:"user_id"`
	TeamID    uint      `json:"team_id"`
	Deadline  time.Time `json:"deadline"`
	Priority  int       `json:"priority"`
}

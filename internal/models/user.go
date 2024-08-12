package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `json:"username"`
	Password string `json:"-"`
	Email    string `json:"email"`
	Teams    []Team `gorm:"many2many:team_users;"`
}

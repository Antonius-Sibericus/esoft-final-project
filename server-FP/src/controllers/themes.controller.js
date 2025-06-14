import ThemesModel from "../models/themes.model.js"

export default class ThemesController {
    static async getAllThemes(req, res) {
        try {
            const allThemes = await ThemesModel.getAllThemes()

            if (!allThemes || allThemes.rows.length === 0) {
                return res.status(500).json({ error: true, message: "Не удалось получить темы" })
            }

            return res.status(200).json({ error: false, message: "Темы получены успешно", themes: allThemes.rows })
        } catch (err) {
            console.error(err.message)
            return res.status(500).json({ error: true, message: "Ошибка на сервере, get all themes" })
        }
    }

    static async getTheme(req, res) {
        const themeId = req.params.id

        if (themeId) {
            try {
                const oneTheme = await ThemesModel.getThemeById(themeId)

                if (!oneTheme || oneTheme.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Тема не найдена" })
                }

                return res.status(200).json({ error: false, message: "Тема найдена успешно", theme: oneTheme.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, get theme" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найден ID темы" })
        }
    }

    static async createTheme(req, res) {
        const { themeTitle, themeTag, themeCategory } = req.body

        if (themeTitle && themeTag && themeCategory) {
            try {
                const themeValues = { themeTitle, themeTag, themeCategory }
                const createdTheme = await ThemesModel.createTheme(themeValues)

                if (!createdTheme || createdTheme.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось создать тему" })
                }

                return res.status(200).json({ error: false, message: "Тема создана успешно", theme: createdTheme.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, create theme" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найдены название и/или тэг темы" })
        }
    }

    static async updateTheme(req, res) {
        const { themeTitle, themeTag, themeCategory } = req.body
        const themeId = req.params.id

        if (themeTitle, themeTag, themeCategory, themeId) {
            try {
                const prevTheme = await ThemesModel.getThemeById(themeId)

                if (!prevTheme || prevTheme.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось найти тему" })
                }

                if (prevTheme.rows[0].theme_title && prevTheme.rows[0].theme_tag && prevTheme.rows[0].theme_cat) {
                    const updatedValues = {
                        title: !themeTitle ? prevTheme.rows[0].theme_title :
                            prevTheme.rows[0].theme_title === themeTitle ? prevTheme.rows[0].theme_title : themeTitle,
                        tag: !themeTag ? prevTheme.rows[0].theme_tag :
                            prevTheme.rows[0].theme_tag === themeTag ? prevTheme.rows[0].theme_tag : themeTag,
                        cat: !themeCategory ? prevTheme.rows[0].theme_cat :
                            prevTheme.rows[0].theme_cat === themeCategory ? prevTheme.rows[0].theme_cat : themeCategory,
                        themeId: themeId
                    }

                    const updatedTheme = await ThemesModel.updateTheme(updatedValues)

                    if (!updatedTheme || updatedTheme.rows.length === 0) {
                        return res.status(500).json({ error: true, message: "Не удалось обновить тему" })
                    }

                    return res.status(200).json({ error: false, message: "Тема успешно обновлена", theme: updatedTheme.rows[0] })
                }
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, update theme" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не найдены название, тэг или ID темы" })
        }
    }

    static async deleteTheme(req, res) {
        const themeId = req.params.id

        if (themeId) {
            try {
                const deletedTheme = await ThemesModel.deleteTheme(themeId)

                if (!deletedTheme || deletedTheme.rows.length === 0) {
                    return res.status(500).json({ error: true, message: "Не удалось удалить тему" })
                }

                return res.status(200).json({ error: false, message: "Тема удалена успешно", deletedTheme: deletedTheme.rows[0] })
            } catch (err) {
                console.error(err.message)
                return res.status(500).json({ error: true, message: "Ошибка на сервере, delete category" })
            }
        } else {
            return res.status(500).json({ error: true, message: "Не обнаружен ID темы" })
        }
    }
}
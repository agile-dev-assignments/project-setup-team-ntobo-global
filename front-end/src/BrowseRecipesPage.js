import { useEffect, useState } from 'react'
import axios from 'axios'

import LargeRecipePreview from './LargeRecipePreview.js'
import KeywordSearchBar from './KeywordSearchBar.js'
import ComboBoxSearchBar from './ComboBoxSearchBar.js'
import TagButton from './TagButton.js'

import './BrowseRecipesPage.css'
import ErrorComponent from './ErrorComponent.js'

const BrowseRecipesPage = (props) => {
    const [reqError, setReqError] = useState(false)

    const [filterKeyword, setFilterKeyword] = useState('')
    const [filterTags, setFilterTags] = useState([])

    // request all tags on initial render
    const [tags, setTags] = useState([])

    useEffect(() => {
        // fetch all tags
        axios(
            `http://localhost:4000/tags?blockedTags=${props.user.blockedTags.reduce(
                (acc, tag) => `&blockedTags=${tag}`,
                ''
            )}`
        )
            .then((response) => {
                setTags(response.data)
            })
            .catch((err) => {
                console.error(err)
                setReqError(true)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // array of recipes to be displayed
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        if (filterKeyword !== '' || filterTags.length > 0) {
            // fetch all recipes
            axios(
                `http://localhost:4000/filteredrecipes?keyword=${filterKeyword}${
                    filterTags.length > 0
                        ? filterTags.reduce(
                              (acc, tag) => acc + `&tags=${tag}`,
                              `&tags=`
                          )
                        : `&tags=`
                }`
            )
                .then((response) => {
                    setRecipes(response.data)
                })
                .catch((err) => {
                    console.error(err)
                    setReqError(true)
                })
        }
    }, [filterKeyword, filterTags])

    // array of recommended recipes
    const [recommendedRecipes, setRecommendedRecipes] = useState([])

    useEffect(() => {
        axios('http://localhost:4000/recommendedrecipes')
            .then((response) => setRecommendedRecipes(response.data))
            .catch((err) => {
                console.error(err)
                setReqError(true)
            })
    }, [])

    const [tagSelection, setTagSelection] = useState('')

    useEffect(() => {
        if (tagSelection !== '') {
            // append selected tag to filter tags array
            setFilterTags(filterTags.concat([tagSelection]))

            // remove selected tag from tags array
            const tagIndex = tags.indexOf(tagSelection)
            setTags(tags.slice(0, tagIndex).concat(tags.slice(tagIndex + 1)))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagSelection])

    return !reqError ? (
        <div className="browseRecipesPage">
            <div className="recipeNameSearchbar">
                <KeywordSearchBar
                    isRecipe={true}
                    filter={filterKeyword}
                    setFilter={setFilterKeyword}
                />
            </div>
            <ComboBoxSearchBar
                isTag={true}
                tags={tags}
                setSelection={setTagSelection}
            />
            <div className="tagButtonsSection">
                {filterTags.map((tag, i) => (
                    <TagButton
                        tag={tag}
                        filterTags={filterTags}
                        setFilterTags={setFilterTags}
                        tags={tags}
                        setTags={setTags}
                        key={i}
                    />
                ))}
            </div>
            <div className="recipesSection">
                <p
                    className={
                        recipes.length === 0 &&
                        (filterKeyword !== '' || filterTags.length > 0)
                            ? 'noRecipesFoundMessage'
                            : 'hidden'
                    }
                >
                    No recipes found
                </p>
                {recipes
                    .sort((a, b) => b.likes - a.likes)
                    .map((recipe, i) => (
                        <LargeRecipePreview
                            recipe={recipe}
                            user={props.user}
                            key={i}
                        />
                    ))}
            </div>
            <div
                className={
                    recipes.length === 0
                        ? 'recommendedRecipesSection'
                        : 'hidden'
                }
            >
                <b className="recommendedRecipesTitle">Recommended Recipes</b>
                {recommendedRecipes.map((recipe, i) => (
                    <LargeRecipePreview
                        recipe={recipe}
                        user={props.user}
                        key={i}
                    />
                ))}
            </div>
        </div>
    ) : (
        <ErrorComponent />
    )
}

export default BrowseRecipesPage

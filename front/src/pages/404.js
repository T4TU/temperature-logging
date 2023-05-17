import * as React from "react"

const NotFoundPage = () => {
    return (
        <div>
            <h1>Page not found.</h1>
            <p>Go <a href="/">home</a>.</p>
        </div>
    )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>

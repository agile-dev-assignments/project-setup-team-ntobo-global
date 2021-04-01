import Button from 'react-bootstrap/Button'

import './SmallUserPreview.css'

//This component is used in both the blocked users page and browse users page
//In both cases, it expects a user object. It also expects a boolean (isBlockedUserProfile)
//To include the component without 'unblock' buttons for each user, specify isBlockedUserProfile=false
//Otherwise, pass in isBlockedUserProfile=true
const SmallUserPreview = (props) => {

    let userSlug = "/user-" + props.user.slug

    return (
        <div className="userPreview">

            {/*preview links to the user profile*/ }
            <a className="userPreviewProfileLink" href={props.isBlockedUserProfile ? false : userSlug}> {/*TODO(?): Disable link if component used for blocked users page?*/ }
                <table className="userPreviewTable">
                    <tr>
                        { /* user profile picture preview */ }
                        <td className="userPreviewImg">
                            <img src={props.user.imagePath} alt="" className="smallUserProfilePic"/>
                        </td>
                        <td>
                            <table className="userPreviewTopTable">
                                <tr>
                                    <td>
                                        <b className="userPreviewFullName">{`${props.user.firstName} ${props.user.lastName}`}</b>
                                    </td>
                                    <td className="unBlock">
                                        {props.isBlockedUserProfile ?
                                                <Button variant='info' size='sm' className="unBlockUserButton" onClick={props.handleClick}>Unblock</Button>
                                            :
                                                <></>
                                        }
                                    </td>
                                </tr>
                            </table>
                            <table className="userPreviewBottomTable">
                                <tr>
                                    <td className="userPreviewBottomCell">
                                        <b className="userPreviewUsername">{`@${props.user.username}`}</b>
                                    </td>
                                    <td className="userPreviewNumericalData userPreviewBottomCell">
                                            {`${props.user.followers.length} followers`}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </a>
        </div>
    )

}

export default SmallUserPreview

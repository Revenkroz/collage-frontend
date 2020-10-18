import React from 'react';
import { connect } from 'react-redux';
import { toggleUploading } from '~/storage/actions';

class UploadingNotification extends React.Component {
    toggleNotification = () => {
        this.props.toggleUploading();
    }

    render() {
        if (!this.props.uploading) {
            return null;
        }

        return (
            <>
                <div className="notification" onClick={this.props.toggleNotification}>
                    <div className="notification__content">
                        Processing file... Please wait.
                    </div>
                </div>
            </>
        );
    }
}

const mapState = (state) => {
    return {
        uploading: state.uploading,
    };
}

export default connect(mapState, { toggleUploading })(UploadingNotification);
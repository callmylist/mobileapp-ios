import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
});

export const StatusIcon = (props: any) => {
    var schedule =
        props.campaign.status != 2 && (props.campaign.call && props.campaign.call.schedule && (props.campaign.call.schedule.id.length > 0 &&
            !props.campaign.call.schedule.stopped));
    return (
        <>
            {schedule && (
                <View
                    style={{
                        position: 'relative',
                        width: 36,
                    }}>
                    <MaterialIcons
                        name="schedule"
                        size={30}
                        color={'#000000'}
                    />
                    {props.campaign.status == 1 && (
                        <Foundation
                            name="burst-new"
                            size={16}
                            color={'#00b7d9'}
                            style={styles.badge}
                        />
                    )}
                    {props.campaign.status == 2 && (
                        <AntDesign
                            name="playcircleo"
                            size={16}
                            color={'#0dac01'}
                            style={styles.badge}
                        />
                    )}
                    {props.campaign.status == 3 && (
                        <AntDesign
                            name="closecircle"
                            size={16}
                            color={'#ff3d00'}
                            style={styles.badge}
                        />
                    )}
                    {props.campaign.status == 4 && (
                        <AntDesign
                            name="checkcircle"
                            size={16}
                            color={'#0dac01'}
                            style={styles.badge}
                        />
                    )}
                </View>
            )}
            {!schedule && (
                <>
                    {props.campaign.status == 1 && (
                        <Foundation
                            name="burst-new"
                            size={24}
                            color={'#00b7d9'}
                        />
                    )}
                    {props.campaign.status == 2 && (
                        <AntDesign
                            name="playcircleo"
                            size={24}
                            color={'#0dac01'}
                        />
                    )}
                    {props.campaign.status == 3 && (
                        <AntDesign
                            name="closecircle"
                            size={24}
                            color={'#ff3d00'}
                        />
                    )}
                    {props.campaign.status == 4 && (
                        <AntDesign
                            name="checkcircle"
                            size={24}
                            color={'#0dac01'}
                        />
                    )}
                </>
            )}
        </>
    );
};

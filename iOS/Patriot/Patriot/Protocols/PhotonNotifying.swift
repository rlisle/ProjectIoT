//
//  PhotonNotifying.swift
//  Patriot
//
//  Created by Ron Lisle on 5/30/18.
//  Copyright © 2018 Rons iMac. All rights reserved.
//

import Foundation

protocol PhotonNotifying
{
    func device(named: String, hasDevices: [DeviceInfo])
    func device(named: String, hasActivities: [ActivityInfo])
}

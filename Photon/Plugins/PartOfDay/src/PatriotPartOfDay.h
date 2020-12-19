/**
PatriotPartOfDay plugin

Features:
- Broadcasts the current part of the day
 
 - Periods can be (in order):
    Night
    Dawn
    Sunrise
    Morning
    Noon
    Afternoon
    Sunset
    Dusk

 Sunrise, noon, and sunset only occur for 1 minute
 
http://www.github.com/rlisle/Patriot

Written by Ron Lisle

BSD license, check license.txt for more information.
All text above must be included in any redistribution.

*/
#pragma once

#include "Particle.h"
#include "device.h"

class Period {
    int     _hour;
    int     _minute;
    String  _name;
    
    Period(int hour, int minute, String name);
    
    bool    operator ==(const Period& hm);
    bool    operator >(const Period& hm);
    bool    operator <(const Period& hm);
};

class PartOfDay : public Device
{
private:
    long       _lastPollTime;
    Period     _periods[8];

    bool       isTimeToUpdate();
    String     determine();
    void       publishCurrent();
    
public:
    String     _current;
    
    PartOfDay();

    void loop();
    
};

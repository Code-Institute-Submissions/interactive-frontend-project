d3.csv("data/powerlifting.csv", function(error, data) {
    if (error) throw error

    //Name,Sex,Event,Equipment,Age,Division,BodyweightKg,
    //WeightClassKg,Squat1Kg,Squat2Kg,Squat3Kg,Squat4Kg,
    //Best3SquatKg,Bench1Kg,Bench2Kg,Bench3Kg,Bench4Kg,
    //Best3BenchKg,Deadlift1Kg,Deadlift2Kg,Deadlift3Kg,
    //Deadlift4Kg,Best3DeadliftKg,TotalKg,Place,Wilks,McCulloch,
    //Tested,AgeClass,Country,Glossbrenner,Federation,Date
    //MeetCountry,MeetState,MeetName

    var ndx = crossfilter(data);
    var all = ndx.groupAll();

    show_gender_selector(ndx);
    show_equipment_selector(ndx);
    show_federation_selector(ndx);
    show_meet_state_selector(ndx);


    dc.renderAll();

    function show_gender_selector(ndx) {
        var dim = ndx.dimension(dc.pluck("Sex"))
        var group = dim.group();

        dc.selectMenu("#show_sex_selector")
            .dimension(dim)
            .group(group);
    };

    function show_equipment_selector(ndx) {
        var dim = ndx.dimension(dc.pluck("Equipment"))
        var group = dim.group();

        dc.selectMenu("#show_equipment_selector")
            .dimension(dim)
            .group(group);
    };

    function show_federation_selector(ndx) {
        var dim = ndx.dimension(dc.pluck("Federation"))
        var group = dim.group();

        dc.selectMenu("#show_federation_selector")
            .dimension(dim)
            .group(group);
    };

    function show_meet_state_selector(ndx) {
        var dim = ndx.dimension(dc.pluck("MeetState"))
        var group = dim.group();

        dc.selectMenu("#show_meet_state_selector")
            .dimension(dim)
            .group(group);
    };

});

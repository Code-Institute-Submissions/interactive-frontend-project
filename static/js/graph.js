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

    //created selectors
    show_gender_selector(ndx);
    show_equipment_selector(ndx);
    show_federation_selector(ndx);
    show_meet_state_selector(ndx);

    //barcharts
    gender_chart(ndx);
    show_rank_distribution_for_equipment(ndx);


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

    function gender_chart(ndx) {
        var dim = ndx.dimension(dc.pluck("Sex"));
        var group = dim.group();

        dc.barChart("#gender-breakdown")
            .width(350)
            .height(250)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(dim)
            .group(group)
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Gender")

    }


    function show_rank_distribution_for_equipment(ndx) {

        var dim = ndx.dimension(dc.pluck("Sex"));

        function rankByEquipment(dimension, equipment) {
            return dimension.group().reduce(
                function addEquipment(p, v) {
                    p.total++;
                    if (v.Equipment == equipment) {
                        p.match++;
                    }
                    return p;
                },
                function removeEquipment(p, v) {
                    p.total--;
                    if (v.Equipment == equipment) {
                        p.match--;
                    }
                    return p;
                },
                function initializeEquipment() {
                    return { total: 0, match: 0 };
                }
            );
        }

        var rankRaw = rankByEquipment(dim, "Raw");
        var rankWraps = rankByEquipment(dim, "Wraps");
        var rankSinglePly = rankByEquipment(dim, "Single-ply");
        var rankMultiPly = rankByEquipment(dim, "Multi-ply");

        dc.barChart("#rank-distribution-for-equipment")
            .width(350)
            .height(500)
            .dimension(dim)
            .group(rankRaw)
            .stack(rankWraps)
            .stack(rankSinglePly)
            .stack(rankMultiPly)
            .valueAccessor(function(d) {
                if (d.value.total > 0) {
                    return (d.value.match / d.value.total) * 100;
                }
                else {
                    return 0;
                }
            })
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Gender")
            .legend(dc.legend().x(320).y(20).itemHeight(15).gap(5).itemWidth(50))
            .margins({ top: 10, right: 100, bottom: 30, left: 30 });
    }
});

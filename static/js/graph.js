d3.csv("data/powerlifting.csv", function(error, data) {
    if (error) throw error

    var ndx = crossfilter(data);

    //created selectors
    show_gender_selector(ndx);
    show_equipment_selector(ndx);
    show_federation_selector(ndx);
    show_meet_state_selector(ndx);
    date_selector(ndx);

    //barcharts
    gender_chart(ndx);
    //ranked charts
    show_rank_distribution_for_equipment(ndx);
    show_rank_distribution_for_tested(ndx);
    show_rank_distribution_for_event(ndx);
    rank_distribution_Meet_Country(ndx);

    //scatterPlot
    //total_place(ndx);

    //rowChart
    place_row_chart(ndx);

    //pieChart
    pie_chart_age_class(ndx);


    dc.renderAll();

    // selector functions
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

    function date_selector(ndx) {
        var dim = ndx.dimension(dc.pluck("Date"))
        var group = dim.group();

        dc.selectMenu("#date_selector")
            .dimension(dim)
            .group(group);
    };

    //bar chart functions
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
            .elasticY(1)

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
            .elasticY(1)
            .legend(dc.legend().x(320).y(20).itemHeight(15).gap(5).itemWidth(50))
            .margins({ top: 10, right: 100, bottom: 30, left: 30 });
    }

    function show_rank_distribution_for_tested(ndx) {

        var dim = ndx.dimension(dc.pluck("Sex"));

        function rankByTested(dimension, tested) {
            return dimension.group().reduce(
                function(p, v) {
                    p.total++;
                    if (v.Tested == tested) {
                        p.match++;
                    }
                    return p;
                },
                function(p, v) {
                    p.total--;
                    if (v.Tested == tested) {
                        p.match--;
                    }
                    return p;
                },
                function() {
                    return { total: 0, match: 0 };
                }
            );
        }

        var testedYes = rankByTested(dim, "Yes")
        var testedNo = rankByTested(dim, "No")

        dc.barChart("#rank-distribution-for-tested")
            .width(350)
            .height(250)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(dim)
            .group(testedYes)
            .stack(testedNo)
            .valueAccessor(function(d) {
                if (d.value.total > 0) {
                    return (d.value.match / d.value.total) * 100;
                }
                else {
                    return 0;
                }
            })
            .legend(dc.legend().x(320).y(20).itemHeight(15).gap(5).itemWidth(50))
            .margins({ top: 10, right: 100, bottom: 30, left: 30 })
            .transitionDuration(500)
            .elasticY(1)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Gender");

    }

    function show_rank_distribution_for_event(ndx) {

        var dim = ndx.dimension(dc.pluck("Event"));

        function rankByGender(dimension, Sex) {
            return dimension.group().reduce(
                function(p, v) {
                    p.total++;
                    if (v.Sex == Sex) {
                        p.match++;
                    }
                    return p;
                },
                function(p, v) {
                    p.total--;
                    if (v.Sex == Sex) {
                        p.match--;
                    }
                    return p;
                },
                function() {
                    return { total: 0, match: 0 };
                }
            );
        }

        var genderF = rankByGender(dim, "F")
        var genderM = rankByGender(dim, "M")

        dc.barChart("#rank-distribution-for-event")
            .width(350)
            .height(250)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(dim)
            .group(genderF)
            .stack(genderM)
            .valueAccessor(function(d) {
                if (d.value.total > 0) {
                    return (d.value.match / d.value.total) * 100;
                }
                else {
                    return 0;
                }
            })
            .legend(dc.legend().x(320).y(20).itemHeight(15).gap(5).itemWidth(50))
            .margins({ top: 10, right: 100, bottom: 30, left: 30 })
            .transitionDuration(500)
            .elasticY(1)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Event");

    }

    function rank_distribution_Meet_Country(ndx) {

        var dim = ndx.dimension(dc.pluck("MeetCountry"));

        function rankByGender(dimension, Sex) {
            return dimension.group().reduce(
                function(p, v) {
                    p.total++;
                    if (v.Sex == Sex) {
                        p.match++;
                    }
                    return p;
                },
                function(p, v) {
                    p.total--;
                    if (v.Sex == Sex) {
                        p.match--;
                    }
                    return p;
                },
                function() {
                    return { total: 0, match: 0 };
                }
            );
        }

        var genderF = rankByGender(dim, "F")
        var genderM = rankByGender(dim, "M")

        dc.barChart("#rank-distribution-for-Meet-Country")
            .width(2000)
            .height(250)
            .margins({ top: 10, right: 50, bottom: 30, left: 50 })
            .dimension(dim)
            .group(genderF)
            .stack(genderM)
            .valueAccessor(function(d) {
                if (d.value.total > 0) {
                    return (d.value.match / d.value.total) * 100;
                }
                else {
                    return 0;
                }
            })
            .margins({ top: 10, right: 100, bottom: 30, left: 30 })
            .transitionDuration(500)
            .elasticY(1)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Meet Country")
            .elasticX(true);
            
            

    }

    //scatter chart functions
    /* function total_place(ndx) {

         //get min and max date
         var date_dim = ndx.dimension(dc.pluck("Date"));

         var min_date = date_dim.bottom(1)[0].date;
         var max_date = date_dim.top(1)[0].date;

         //get Place 
         var totalPlace_dim = ndx.dimension(function(d) { return [+d.Date, +d.Place]; })
         var totalPlace_group = totalPlace_dim.group();

         dc.scatterPlot("#scatterPlot_place")
             .width(1000)
             .height(350)
             .x(d3.time.scale().domain([min_date, max_date]))
             .dimension(totalPlace_dim)
             .group(totalPlace_group)
             .brushOn(false)
             .symbolSize(8)
             .clipPadding(10)
             .yAxisLabel("This is the Y Axis!")
             .xAxisLabel("This is the X Axis!");
     } */

    function place_row_chart(ndx) {
        var place_dim = ndx.dimension(dc.pluck("Place"))
        var place_group = place_dim.group();

        dc.rowChart("#row-chart-place")
            .width(700)
            .dimension(place_dim)
            .group(place_group)
            .elasticX(1)
            .fixedBarHeight(25)
            .cap(4);
    }

    //pie-chart
    /* function pie_chart_place(ndx) {

        var dim_place = ndx.dimension(dc.pluck("Place"))

        var group_place = dim_place.group()

        dc.pieChart("#piechart_place")
            .width(500)
            .height(350)
            .slicesCap(4)
            .innerRadius(50)
            .dimension(dim_place)
            .group(group_place)
            .legend(dc.legend());

    }; */

    function pie_chart_age_class(ndx) {

        var dim_age_class = ndx.dimension(dc.pluck("AgeClass"))

        var group_age_class = dim_age_class.group()

        dc.pieChart("#piechart_age_class")
            .width(500)
            .height(350)
            .slicesCap(8)
            .innerRadius(50)
            .dimension(dim_age_class)
            .group(group_age_class)
            .legend(dc.legend());

    };

});

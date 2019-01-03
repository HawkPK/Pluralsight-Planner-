<template lang="pug">
.md-layout-item.md-small-size-50.md-size-25
    md-card.md-card-stats.md-elevation-5
        md-card-header.md-elevation-3(:data-background-color='color')
            md-icon {{ icon }}
        md-card-content
            slot(name='content')
        md-card-actions(md-alignment='left')
            slot(name='footer')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({})
export default class StatsCard extends Vue {
    @Prop() color: string
    @Prop() icon: string
}
</script>

<style lang="scss">
@import '~vue-material/dist/theme/engine';

.md-card {
    background: #4f6b87 !important;
}

p.category {
    margin: 0;
    font-size: 1.1rem;
}

.md-card-stats {
    margin: 55px 0 25px;

    .title {
        margin: 0;

        small {
            color: #ccc;
            font-size: 65%;
            line-height: 1;
            font-weight: 400;
        }
    }
    .md-card-header {
        float: left;
        text-align: center;
        margin: -20px 15px 0;
        border-radius: 3px;
        padding: 15px;

        .md-icon {
            font-size: 48px !important;
            line-height: 56px;
            width: 56px;
            height: 56px;
            color: #fff !important;
        }
    }
    .md-card-content {
        text-align: right;
        padding-top: 10px;
    }
}

[data-background-color='green'] {
    background: linear-gradient(
        60deg,
        md-get-palette-color(green, 400),
        md-get-palette-color(green, 600)
    );
}
[data-background-color='blue'] {
    background: linear-gradient(
        60deg,
        md-get-palette-color(cyan, 400),
        md-get-palette-color(cyan, 600)
    );
}
[data-background-color='purple'] {
    background: linear-gradient(
        60deg,
        md-get-palette-color(purple, 400),
        md-get-palette-color(purple, 600)
    );
}
[data-background-color='orange'] {
    background: linear-gradient(
        60deg,
        md-get-palette-color(orange, 400),
        md-get-palette-color(orange, 600)
    );
}
[data-background-color='red'] {
    background: linear-gradient(
        60deg,
        md-get-palette-color(red, 400),
        md-get-palette-color(red, 600)
    );
}
[data-background-color] {
    &,
    a {
        color: #fff;
    }
}
</style>

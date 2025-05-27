from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    dependencies = [
        ('core', '0007_rename_timestamp_fields'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projeto',
            name='responsavel',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.SET_NULL,
                null=True,
                blank=True,
                related_name='projetos_responsavel',
                to='auth.user',
            ),
        ),
    ] 